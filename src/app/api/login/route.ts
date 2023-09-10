// pages/api/login.ts
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

interface User {
  email: string;
  password: string; // Store the hashed password in the database
  // Other user properties
}

async function getUserByEmail(email: string): Promise<User | null> {
  try {
    // Make a GET request to your external API's endpoint to fetch user data
    const response = await fetch(
      `http://booksra.helioho.st/v1/user/login?email=${email}`
    );

    if (response.status === 200) {
      // Parse the response JSON to get the user data
      const userData = await response.json();
      return userData as User; // Typecast the response to User
    } else if (response.status === 404) {
      return null; // Return null if no user was found with the given email
    } else {
      throw new Error("Failed to fetch user by email");
    }
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method not allowed
  }

  const { email, password } = req.body;

  // Fetch user from your database using the email
  const user = await getUserByEmail(email);

  try {
    // Fetch user from your database using the email
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Authentication successful; create a user session or token and return it
    // Implement createAuthToken or import it from another module
    const token = createAuthToken(user); // Implement this function to generate a token
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
