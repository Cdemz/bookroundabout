"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserAction } from "../redux/actions"; // Import the action for updating user
import { RootState } from "../redux/store";
import { useRouter } from "next/navigation";
import { FaAddressCard, FaAsterisk } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { API_BASE_URL } from "../utils/api";

const Account = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user); // Assuming you have a 'user' state in your Redux store

  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    country: user.country || "",
    companyName: user.companyName || "",
    address: user.address || "",
    zipCode: user.zipCode || "",
    state: user.state || "",
    phone: user.phone || "",
    email: user.email || "",
    town: user.town || "",
  });

  const {
    firstName,
    lastName,
    country,
    companyName,
    address,
    zipCode,
    state,
    phone,
    email,
    town,
  } = formData;

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage

      //   if (!token) {
      //     console.error("No token found");
      //     router.push("/login");
      //     return;
      //   }

      try {
        const response = await axios.get(`${API_BASE_URL}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data) {
          // Assuming response.data contains user data
          setFormData({
            firstName: response.data.firstName || "",
            lastName: response.data.lastName || "",
            country: response.data.country || "",
            companyName: response.data.companyName || "",
            address: response.data.address || "",
            zipCode: response.data.zipCode || "",
            state: response.data.state || "",
            phone: response.data.phone || "",
            email: response.data.email || "",
            town: response.data.town || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user data", error);
        // Handle error, e.g., redirect to login if unauthorized
        // router.push("/login");
      }
    };

    fetchUserData();
  }, [router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Dispatch the action to update the user with the new data
    // dispatch<any>(updateUserAction(formData));
    const response = await dispatch<any>(updateUserAction(formData));

    if (response && response.statusCode >= 200 && response.statusCode < 300) {
      // Successful update
      //   toast.success("Profile updated successfully");
    } else {
      // Handle error here, e.g., show an error message
      toast.success("Profile updated successfully");
    }
  };

  // useEffect(() => {
  //   // Redirect to the login page if the user is not authenticated
  //   if (!user.isAuthenticated) {
  //     router.push("/login");
  //   }
  // }, [user, router]);

  return (
    <div className="text-[var(--color-text)] p-6">
      <div className="">
        <div className="mx-auto lato">
          <form
            className="form p-2   flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
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
                  className="border-2 border-gray-400 w-[85%] h-10 border-r-2 text-[var(--color-text)]"
                  name="firstName"
                  placeholder="Enter your first name"
                  required
                  value={firstName}
                  onChange={handleChange}
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
                  name="lastName"
                  placeholder="Enter your last name"
                  required
                  value={lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* company */}
            <div className="flex-col flex gap-2">
              <label>Company name</label>

              <input
                type="text"
                className="border-2 border-gray-400 w-[85%] h-10 border-r-2 "
                name="companyName"
                placeholder="Your company name"
                value={companyName}
                onChange={handleChange}
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
                name="country"
                placeholder="e.g. Nigeria"
                required
                value={country}
                onChange={handleChange}
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
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
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
                name="state"
                className="rounded shadow appearance-none border py-2 px-3 text-grey-darker leading-tight
            focus:outline-none focus:shadow-outline w-[85%]"
                required
                value={state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
              >
                <option value="Abia">Abia</option>
                <option value="Adamawa">Adamawa</option>
                <option value="Akwa Ibom">Akwa Ibom</option>
                <option value="Anambra">Anambra</option>
                <option value="Bauchi">Bauchi</option>
                <option value="Bayelsa">Bayelsa</option>
                <option value="Benue">Benue</option>
                <option value="Borno">Borno</option>
                <option value="Cross River">Cross River</option>
                <option value="Delta">Delta</option>
                <option value="Ebonyi">Ebonyi</option>
                <option value="Edo">Edo</option>
                <option value="Ekiti">Ekiti</option>
                <option value="Enugu">Enugu</option>
                <option value="Gombe">Gombe</option>
                <option value="Imo">Imo</option>
                <option value="Jigawa">Jigawa</option>
                <option value="Kaduna">Kaduna</option>
                <option value="Kano">Kano</option>
                <option value="Katsina">Katsina</option>
                <option value="Kebbi">Kebbi</option>
                <option value="Kogi">Kogi</option>
                <option value="Kwara">Kwara</option>
                <option value="Lagos">Lagos</option>
                <option value="Nasarawa">Nasarawa</option>
                <option value="Niger">Niger</option>
                <option value="Ogun">Ogun</option>
                <option value="Ondo">Ondo</option>
                <option value="Osun">Osun</option>
                <option value="Oyo">Oyo</option>
                <option value="Plateau">Plateau</option>
                <option value="Rivers">Rivers</option>
                <option value="Sokoto">Sokoto</option>
                <option value="Taraba">Taraba</option>
                <option value="Yobe">Yobe</option>
                <option value="Zamfara">Zamfara</option>
              </select>
            </div>
            {/* city */}
            <div className="flex-col flex gap-2">
              <label className="flex gap-1">
                Town
                <span className="text-sm text-red-500">
                  <FaAsterisk />
                </span>{" "}
              </label>
              <input
                type="text"
                name="town"
                placeholder="Enter your town..."
                required
                className="w-[85%]"
                value={town}
                onChange={handleChange}
              />
            </div>
            {/* zip code */}
            <div className="flex-col flex gap-2">
              <label className="flex gap-1">Zip code</label>
              <input
                type="number"
                name="zipCode"
                placeholder="Enter your zip code..."
                className="w-[85%]"
                value={zipCode}
                onChange={handleChange}
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
                value={phone}
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </div>
            {/* Save Address */}
            <div className="">
              <button
                type="submit"
                className="px-4 py-1 bg-[var(--color-primary)] text-white"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;
