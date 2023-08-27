"use client";
import { useState, useContext } from "react";
import { CartContext } from "../CartContent";
import CartProduct from "./CartProduct";

function NavbarComponent() {
  const cart = useContext(CartContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const checkout = async () => {
    await fetch("http://localhost:4000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cart.items }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.url) {
          window.location.assign(response.url); // Forwarding user to Stripe
        }
      });
  };

  const productsCount = cart.items.reduce(
    (sum, product) => sum + (product.quantity ?? 0), // Use 0 as the default value if product.quantity is undefined
    0
  );

  return (
    <>
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-white text-xl font-semibold">
            Ecommerce Store
          </a>
          <button
            onClick={handleShow}
            className="text-white bg-transparent border border-white py-2 px-4 rounded"
          >
            Cart ({productsCount} Items)
          </button>
        </div>
      </nav>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-black p-4 rounded-lg">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-xl font-semibold">Shopping Cart</h2>
              <button onClick={handleClose} className="text-gray-500">
                Close
              </button>
            </div>
            <div className="py-4">
              {productsCount > 0 ? (
                <>
                  <p className="mb-2">Items in your cart:</p>
                  {cart.items.map((currentProduct, idx) => (
                    <CartProduct
                      key={idx}
                      id={currentProduct.id ?? 0} // Use 0 as the default value if currentProduct.id is undefined
                      quantity={currentProduct.quantity ?? 0} // Use 0 as the default value if currentProduct.quantity is undefined
                    ></CartProduct>
                  ))}

                  <h1 className="text-xl font-semibold">
                    Total: {cart.getTotalCost().toFixed(2)}
                  </h1>

                  <button
                    onClick={checkout}
                    className="bg-green-500 text-white py-2 px-4 mt-4 rounded hover:bg-green-600"
                  >
                    Purchase items!
                  </button>
                </>
              ) : (
                <h1 className="text-xl font-semibold">
                  There are no items in your cart!
                </h1>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NavbarComponent;
