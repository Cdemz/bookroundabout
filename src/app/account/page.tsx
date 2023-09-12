"use client"; // Import necessary modules and components

import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation"; // Import 'next/router' for redirection
import User from "../components/User";
import { FaAddressCard, FaAsterisk } from "react-icons/fa";

interface SessionData {
  user: {
    firstName?: string;
    lastName?: string;
    country?: string;
    companyName?: string;
    address?: string;
    zipCode?: string;
    state?: string;
    phoneNumber?: string;
  };
}

interface UserData {
  firstName: string;
  lastName: string;
  country: string;
  companyName: string;
  address: string;
  zipCode: string;
  state: string;
  phoneNumber: string;
  email: string;
  city: string;
}

const MyAccount = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      // Use 'next/router' for redirection
      if (typeof window !== "undefined") {
        // Check if we're on the client side
        redirect("/login?callbackUrl=/account");
      }
    },
  });

  const initialUserData: UserData = {
    firstName: session?.user?.firstName || "",
    lastName: session?.user?.lastName || "",
    country: session?.user?.country || "",
    companyName: session?.user?.companyName || "",
    address: session?.user?.address || "",
    zipCode: session?.user?.zipCode || "",
    state: session?.user?.state || "",
    phoneNumber: session?.user?.phoneNumber || "",
    email: session?.user?.email || "",
    city: session?.user?.city || "",
  };

  // Declare and initialize 'firstName' and 'setFirstName'
  const [firstName, setFirstName] = useState(initialUserData.firstName);
  const [lastName, setLastName] = useState(initialUserData.lastName);
  const [country, setCountry] = useState(initialUserData.country);
  const [companyName, setCompanyName] = useState(initialUserData.companyName);
  const [address, setAddress] = useState(initialUserData.address);
  const [zipCode, setZipCode] = useState(initialUserData.zipCode);
  const [state, setState] = useState(initialUserData.state);
  const [city, setCity] = useState(initialUserData.city);
  const [phoneNumber, setPhoneNumber] = useState(initialUserData.phoneNumber);
  const [email, setEmailr] = useState(initialUserData.email);

  // Declare and initialize 'userData' and 'setUserData'
  const [userData, setUserData] = useState<UserData>(initialUserData);

  // Declare and initialize 'isUpdating' and 'setIsUpdating'
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);

    try {
      const endpoint = "http://booksra.helioho.st/v1/user"; // Your API endpoint URL

      // Make a PUT request to the specified endpoint with updated user data
      const response = await axios.put(endpoint, userData);

      // Handle the response as needed
      setIsUpdating(false);
    } catch (error) {
      console.error("Error updating user data:", error);
      setIsUpdating(false);
    }
  };

  return (
    <div className="text-[var(--color-text)] p-6">
      <div className="">
        <h1 className="text-center font-bold text-lg mb-6">My Account</h1>
        <div className="text-center">
          <User />
          <h2>Order history</h2>
          <p className="italic">You haven't placed any order yet.</p>
        </div>
        <div className="mx-auto lato">
          <h1 className="text-[var(--color-text)] text-lg font-bold my-4 flex text-center items-center gap-2 ">
            Billing address
            <FaAddressCard size={20} />
          </h1>
          <form className="form p-2   flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-col flex gap-2">
                <label className="flex gap-1">
                  First name
                  <span className="text-sm text-red-500">
                    <FaAsterisk />
                  </span>{" "}
                </label>

                <input
                  type="text"
                  className="border-2 border-gray-400 w-[85%] h-10 border-r-2"
                  name="first"
                  placeholder="Enter your first name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex-col flex gap-2">
                <label className="flex gap-1">
                  Last name
                  <span className="text-sm text-red-500">
                    <FaAsterisk />
                  </span>{" "}
                </label>

                <input
                  type="text"
                  className="border-2 border-gray-400 w-[85%] h-10 border-r-2 "
                  name="last-name"
                  placeholder="Enter your last name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            {/* company */}
            <div className="flex-col flex gap-2">
              <label>Company name</label>

              <input
                type="text"
                className="border-2 border-gray-400 w-[85%] h-10 border-r-2 "
                name="last-name"
                placeholder="Your company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            {/* country */}
            <div className="flex-col flex gap-2">
              <label className="flex gap-1">
                Country/Region
                <span className="text-sm text-red-500">
                  <FaAsterisk />
                </span>{" "}
              </label>

              <input
                type="text"
                className="border-2 border-gray-400 w-[85%] h-10 border-r-2 "
                name="Country"
                placeholder="e.g. Nigeria"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            {/* street address */}
            <div className="flex-col flex gap-2">
              <label className="flex gap-1">
                Street address
                <span className="text-sm text-red-500">
                  <FaAsterisk />
                </span>{" "}
              </label>
              <textarea
                className="border-2 border-gray-400 w-[85%] h-20 border-r-2 "
                name="street"
                placeholder="e.g. 1234 Main St"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            {/* state */}
            <div className="flex-col flex gap-2">
              <label className="flex gap-1">
                State
                <span className="text-sm text-red-500">
                  <FaAsterisk />
                </span>{" "}
              </label>
              <select
                id=""
                className="rounded shadow appearance-none border py-2 px-3 text-grey-darker leading-tight
            focus:outline-none focus:shadow-outline w-[85%]"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="Abia">Abia</option>
                <option value="Adamawa">Adamawa</option>
                {/* Add more state options here */}
              </select>
            </div>
            {/* city */}
            <div className="flex-col flex gap-2">
              <label className="flex gap-1">
                City
                <span className="text-sm text-red-500">
                  <FaAsterisk />
                </span>{" "}
              </label>
              <input
                type="text"
                name="city"
                placeholder="Enter your city..."
                required
                className="w-[85%]"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            {/* zip code */}
            <div className="flex-col flex gap-2">
              <label className="flex gap-1">Zip code</label>
              <input
                type="text"
                name="zip"
                placeholder="Enter your zip code..."
                className="w-[85%]"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
            {/* phone number */}
            <div className="flex-col flex gap-2">
              <label className="flex gap-1">
                Phone number
                <span className="text-sm text-red-500">
                  <FaAsterisk />
                </span>{" "}
              </label>
              <input
                type="text"
                name="phone"
                placeholder="Enter your phone number..."
                required
                className="w-[85%]"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            {/* email */}
            <div className="flex-col flex gap-2">
              <label className="flex gap-1">
                Email address
                <span className="text-sm text-red-500">
                  <FaAsterisk />
                </span>{" "}
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address..."
                required
                className="w-[85%]"
                value={email}
                onChange={(e) => setEmailr(e.target.value)}
              />
            </div>
            {/* Save Address */}
            <div className="">
              <button
                type="submit"
                className="px-4 py-1 bg-[var(--color-primary)] text-white"
              >
                Save Address
              </button>
            </div>
          </form>
          <div className="flex flex-col gap-4 w-20 mt-4">
            <button
              className="px-4 py-1 bg-[var(--color-primary)] text-white"
              onClick={handleUpdate}
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update Profile"}
            </button>

            <button className="px-4 py-1 bg-[var(--color-primary)] text-white">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
