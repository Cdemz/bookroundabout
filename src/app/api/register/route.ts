import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import fetch from "node-fetch";

interface Request {
  json(): Promise<any>;
}

// Define the base URL as a variable
const baseURL = "http://booksra.helioho.st/v1";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  // Construct the full API endpoint URL based on the base URL
  const createUserEndpoint = `${baseURL}/user/register`;

  // Hash the user's password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user using your existing API
  const createUserResponse = await fetch(createUserEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, hashedPassword }),
  }).catch((err) => {
    console.log("error on bakend req");
    console.log(err);
    console.log(Object.entries(err));
  });

  if (!createUserResponse) {
    return new NextResponse("Error creating user", { status: 400 });
  }

  if (createUserResponse.status !== 200) {
    console.error(
      `Failed to create user. API response status: ${createUserResponse.status}`
    );

    // Log the response details
    console.log("Response Status:", createUserResponse.status);
    console.log("Response Headers:", createUserResponse.headers);

    // To log the raw response text (body), you can use the following:
    createUserResponse.text().then((text) => {
      console.log("Raw Response Body:", text);
    });

    // Handle the error if user creation fails
    throw new Error("Failed to create user");
  }

  const user = await createUserResponse.json();
  return NextResponse.json(user);
}
