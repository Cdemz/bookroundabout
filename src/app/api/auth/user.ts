import { NextApiRequest, NextApiResponse } from "next";

// Import your functions here
import { verifyToken, getUserData } from "../../auth/authFunction"; // Replace with the actual path to your functions

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    // Verify and decode the token to get the user ID
    const { id } = verifyToken(token); // Implement your token verification logic

    // Fetch user data based on the user ID
    const userData = await getUserData(id); // Implement your user data retrieval logic

    if (!userData) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Store user data in localStorage
    localStorage.setItem("userData", JSON.stringify(userData));

    // Return user data in the response
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
