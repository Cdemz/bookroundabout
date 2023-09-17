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
    console.log(response.data);
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
    console.log(response.data);
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
  console.log("it ran");
  const token = localStorage.getItem("token");
  console.log("here:", { token });
  // const response = await fetch("http://booksra.helioho.st/v1/user", {
  //   method: "GET",
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });
  try {
    const response = await axios.get(
      `${API_BASE_URL}
    `,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log(response.data);
    console.log("omo");
    return response.data;
  } catch (error) {
    console.log(error);
    console.log("omo it failed");
    throw error;
  }
};
