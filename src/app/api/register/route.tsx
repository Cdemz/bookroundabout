import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { toast } from "react-hot-toast"; // Import toast from React Hot Toast

const prisma = new PrismaClient();

export default async function registerUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    // Handle other HTTP methods (e.g., GET, PUT, DELETE) appropriately or return a 405 error
    res.status(405).end();
    return;
  }

  try {
    const { email, password } = req.body;
    // Validate input here if needed, but for simplicity, we'll skip validation here

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user !== null) {
      // Display an error toast if the user already exists
      toast.error("User already exists");
      return res.send({ user: null, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Display a success toast if the user is created successfully
    toast.success("User created successfully");

    return res.send({ user: newUser, message: "User created successfully" });
  } catch (error) {
    // Handle any other errors here
    console.error("Error during registration:", error);
    // Display an error toast for other errors
    toast.error("Something went wrong");
    return res
      .status(500)
      .send({ user: null, message: "Something went wrong" });
  }
}
