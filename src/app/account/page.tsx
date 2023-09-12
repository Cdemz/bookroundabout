"use client"; // Import necessary modules and components
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import User from "../components/User";
import { FaAddressCard, FaAsterisk } from "react-icons/fa";

// Define a type for the user data
interface UserData {
  firstName: string;
  lastName: string;
  country: string;
  companyName: string;
  address: string;
  zipCode: string;
  state: string;
  phoneNumber: string;
}

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

function MyAccount() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/account");
    },
  });

  // Initialize user data with default values or data from the session
  const initialUserData: UserData = {
    firstName: session?.user?.firstName || "",
    lastName: session?.user?.lastName || "",
    country: session?.user?.country || "",
    companyName: session?.user?.companyName || "",
    address: session?.user?.address || "",
    zipCode: session?.user?.zipCode || "",
    state: session?.user?.state || "",
    phoneNumber: session?.user?.phoneNumber || "",
  };

  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);

    try {
      const response = await axios.put("/api/updateUser", userData);
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
            <button className="px-4 py-1 bg-[var(--color-primary)] text-white">
              Edit
            </button>

            <button className="px-4 py-1 bg-[var(--color-primary)] text-white">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
