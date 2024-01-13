// api.ts
import axios from "axios";
import { fetchUserAction } from "../redux/actions";

let API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// console.log({
//   API_BASE_URL,
//   procE: Object.keys(process.env).includes("NEXT_PUBLIC_API_BASE_URL"),
// });
// if (!Object.keys(process.env).includes("NEXT_PUBLIC_API_BASE_URL")) {
//   API_BASE_URL = "https://booksroundabout.glitch.me/v1";
// }
if (!Object.keys(process.env).includes("NEXT_PUBLIC_API_BASE_URL")) {
  API_BASE_URL = "https://booksroundaboutapi.xyz/v1";
}
// console.log(API_BASE_URL); //

// console.log({
//   API_BASE_URL,
//   procE: Object.keys(process.env).includes("NEXT_PUBLIC_API_BASE_URL"),
// });
// if (!Object.keys(process.env).includes("NEXT_PUBLIC_API_BASE_URL")) {
//   API_BASE_URL = "https://booksroundaboutapi.xyz/v1";
// }
// console.log(API_BASE_URL);
export { API_BASE_URL };

interface UserData {
  firstName: string;
  email: string;
  password: string;
  role: string;

  // Add other properties as needed
}

export const registerUser = async (userData: UserData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/register`,
      userData
    );
    // console.log(response.data);
    const token = response?.data?.token || "";
    localStorage.setItem("token", token);
    fetchUserAction();
    return response.data;
  } catch (error) {
    const res = error as any;
    if (res?.response?.data) {
      return res.response.data;
    }
    return error;
  }
};

export const loginUser = async (userData: UserData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login`, userData);

    // Save the token to local storage
    // console.log(response.data);
    const token = response?.data?.token || "";
    localStorage.setItem("token", token);
    fetchUserAction();
    return response.data;
  } catch (error) {
    const res = error as any;
    if (res?.response?.data) {
      return res.response.data;
    }
    return error;
  }
};

// Define other API functions with specific parameter types

export const fetchUserData = async () => {
  // console.log("it ran");
  const token = localStorage.getItem("token");
  // console.log("here:", { token });

  try {
    const response = await axios.get(
      `${API_BASE_URL}/user
    `,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // console.log(response.data);
    // console.log("omo");
    return response.data;
  } catch (error) {
    // console.log(error);
    // console.log("omo it failed");
    throw error;
  }
};

export const updateUser = async (userData: UserData) => {
  const token = localStorage.getItem("token");
  // console.log("from update:", { token });
  try {
    const response = await axios.put(
      `${API_BASE_URL}/user`, // Your API endpoint here
      userData, // Send the user data you want to update
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // console.log("update 2", userData, "res:", response);

    // Check if the response contains a new token
    if (response.headers && response.headers.authorization) {
      const newToken = response.headers.authorization.replace("Bearer ", "");
      localStorage.setItem("token", newToken); // Save the new token in local storage
      // console.log("from update new:", { token });
      localStorage.setItem("userData", JSON.stringify(userData));
      // console.log("Updated userData:", userData);
    }

    // localStorage.removeItem("userData");
    // console.log("update", response.data);
    return response.data;
  } catch (error) {
    // console.log("fela:", error);
    throw error;
  }
};

export const requestPasswordReset = async (email: string) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/user/begin-change-password`,
      { email }
    );
    return response.data; // You can return any relevant data from the API response
  } catch (error) {
    throw error;
  }
};

// Function to confirm the password reset with a token and set a new password
export const confirmPasswordReset = async (
  email: string,
  token: string,
  newPassword: string
) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/user/finish-change-password`,
      {
        email,
        token,
        newPassword,
      }
    );
    return response.data; // You can return any relevant data from the API response
  } catch (error) {
    throw error;
  }
};
