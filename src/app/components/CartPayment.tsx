"use client";
import { SiMediamarkt } from "react-icons/si";
import FormattedPrice from "./FormattedPrice";
import { useDispatch, useSelector } from "react-redux";
import { StateProps, StoreProduct } from "../type";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../utils/api";
import toast from "react-hot-toast";

interface DeliveryLocation {
  id: number;
  name: string;
  description: string;
  price: string;
}

interface Book {
  id: number;
  title: string;
  code: string;
  quantity: number; // Include other properties as needed
}

const CartPayment = () => {
  const { productData, user } = useSelector((state: StateProps) => state.next);
  const [totalAmount, setTotalAmount] = useState(0);
  const [deliveryType, setDeliveryType] = useState("delivery"); // Default to "delivery"
  const [deliveryLocations, setDeliveryLocations] = useState<
    DeliveryLocation[]
  >([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  const [hasFetchedLocations, setHasFetchedLocations] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    // Specify the type of 'acc' as number
    let amt = productData.reduce(
      (acc: number, item: StoreProduct) => acc + item.price * item.quantity,
      0
    );

    // Add price of selected delivery location
    if (deliveryType === "delivery" && selectedLocation) {
      const selectedLocationData = deliveryLocations.find(
        (location) => location.id.toString() === selectedLocation
      );
      if (selectedLocationData) {
        amt += parseFloat(selectedLocationData.price);
      }
    }

    setTotalAmount(amt);

    const fetchDeliveryLocations = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/location`);
        const locations = await response.json();
        setDeliveryLocations(locations);
        setHasFetchedLocations(true); // Update the state when locations are fetched
      } catch (error) {
        console.error("Failed to fetch delivery locations:", error);
      }
    };

    if (deliveryType === "delivery" && !hasFetchedLocations) {
      fetchDeliveryLocations();
    }
  }, [productData, deliveryType, selectedLocation, deliveryLocations]); // Removed deliveryLocations from dependencies

  const handleCheckout = async () => {
    try {
      const calculationResponse = await calculatePrice();

      if (
        calculationResponse &&
        calculationResponse.data &&
        typeof calculationResponse.finalPrice !== "undefined"
      ) {
        const userEmail = calculationResponse.data.user?.email;
        if (!userEmail) {
          console.error("User email is not available");
          toast.error("User email is not available.");
          return;
        }

        const purchaseResponse = await makePurchase(
          calculationResponse.data,
          userEmail
        );
        if (purchaseResponse && purchaseResponse.status === "pending") {
          // Redirect user to the purchase URL
          window.location.href = purchaseResponse.purchaseUrl;
          // The application should handle the callback from this URL
        } else {
          toast.error("Purchase failed.");
        }
      } else {
        toast.error("Failed to calculate price.");
      }
    } catch (error) {
      console.error("Checkout process failed:", error);
      toast.error("Checkout process failed.");
    }
  };

  const handleDeliveryTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDeliveryType(e.target.value.toLowerCase()); // Ensure the value is either 'pickup' or 'delivery'
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(e.target.value);
  };
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  async function calculatePrice() {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token"); // Replace 'yourTokenKey' with the actual key

    // Transform productData into the expected format
    const books = productData.map((item: StoreProduct) => ({
      bookId: item.id.toString(), // Convert bookId to a string
      quantity: item.quantity.toString(), // Convert quantity to a string
    }));

    // Ensure we have at least one book
    if (books.length === 0) {
      console.error("No books in the cart to calculate price for");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const body = JSON.stringify({
      books,
      deliveryType, // Include the selected delivery type here
      locationId: deliveryType === "delivery" ? selectedLocation : null,
    });

    const response = await fetch(`${API_BASE_URL}/purchase/calculate`, {
      method: "POST",
      headers: headers,
      body: body,
    });
    return await response.json();
  }

  // Make Purchase Function
  async function makePurchase(calculationData: any, userEmail: string) {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found");
      toast.error("You are not authorized to make this purchase.");
      return null;
    }

    const payload = {
      books: calculationData.books.map((book: Book) => ({
        bookId: book.id.toString(),
        quantity: book.quantity ? book.quantity.toString() : "1",
      })),
      deliveryType: calculationData.isDelivery ? "delivery" : "pickup",
      locationId: deliveryType === "delivery" ? selectedLocation : undefined,
      notes,
      callbackUrl: "https://bookroundabout.vercel.app/PaymentVerification", // Replace with your actual callback URL
    };

    const response = await fetch(`${API_BASE_URL}/purchase/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    return await response.json();
  }

  // Verify Purchase Function
  async function verifyPurchase(transactionId: any) {
    const response = await fetch(`${API_BASE_URL}/purchase/verify/:code`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transactionId }),
    });
    return await response.json();
  }
  return (
    <div className="flex flex-col gap-4 w-[80%]">
      {/* Delivery Type Selection */}
      <div className="text-black">
        <label htmlFor="deliveryType">Delivery Type:</label>
        <select
          id="deliveryType"
          value={deliveryType}
          onChange={(e) => setDeliveryType(e.target.value)}
        >
          <option value="pickup">Pickup</option>
          <option value="delivery">Delivery</option>
        </select>
      </div>

      {/* Delivery Location Selection - Shown only if Delivery is selected */}
      {deliveryType === "delivery" && (
        <div className="text-black w-full">
          <label htmlFor="deliveryLocation">Delivery Location:</label>
          <select
            id="deliveryLocation"
            value={selectedLocation}
            onChange={handleLocationChange}
          >
            <option value="">Select Delivery Location</option>
            {deliveryLocations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name} - Price: {location.price}
              </option>
            ))}
          </select>

          <div className="text-black">
            <label htmlFor="notes">Notes:</label>
            <textarea
              id="notes"
              value={notes}
              onChange={handleNotesChange}
              className="w-full border rounded-md p-2"
              placeholder="Enter any notes here"
            />
          </div>
        </div>
      )}

      <div className=""></div>
      {/* <div className="flex gap-2">
        <p className="text-sm text-[var(--color-text)]">
          Your order qualifies for FREE Shipping by Choosing this option at
          checkout. See details....
        </p>
      </div> */}
      <p className="flex items-center justify-between px-2 font-semibold text-[var(--color-text)]">
        Total:{" "}
        <span className="font-bold text-xl">
          <FormattedPrice amount={totalAmount} />
        </span>
      </p>

      <div className="flex flex-col items-center">
        <button
          onClick={handleCheckout}
          className="w-full h-10 text-sm font-semibold bg-[var(--color-primary)] text-white rounded-lg hover:bg-amazon_yellow hover:text-black duration-300"
        >
          Proceed to Buy
        </button>
      </div>
    </div>
  );
};

export default CartPayment;
