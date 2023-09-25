// api.ts
import axios from "axios";
import { fetchUserAction } from "../redux/actions";

const API_BASE_URL = "http://booksra.helioho.st/v1/user";

interface UserData {
  firstName: string;
  email: string;
  password: string;
  role: string;

  // Add other properties as needed
}

export const registerUser = async (userData: UserData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    // console.log(response.data);
    const token = response?.data?.token || "";
    localStorage.setItem("token", token);
    fetchUserAction();
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userData: UserData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, userData);

    // Save the token to local storage
    // console.log(response.data);
    const token = response?.data?.token || "";
    localStorage.setItem("token", token);
    fetchUserAction();
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Define other API functions with specific parameter types

export const fetchUserData = async () => {
  // console.log("it ran");
  const token = localStorage.getItem("token");
  // console.log("here:", { token });

  try {
    const response = await axios.get(
      `${API_BASE_URL}
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
      `${API_BASE_URL}`, // Your API endpoint here
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
    const response = await axios.post(`${API_BASE_URL}`, { email });
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
    const response = await axios.put(`${API_BASE_URL}`, {
      email,
      token,
      newPassword,
    });
    return response.data; // You can return any relevant data from the API response
  } catch (error) {
    throw error;
  }
};