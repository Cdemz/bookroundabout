import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const res = await fetch("http://booksra.helioho.st/v1/user/login", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });

          if (!res.ok) {
            // Handle non-success HTTP status codes (e.g., 401 Unauthorized)
            console.error("API Error: Status Code", res.status);
            return null; // Return null for authentication failure
          }

          const data = await res.json();
          // console.log("API Response:", data);
          // console.log("APponse:", data.token);

          if (data.token) {
            // Token successfully retrieved from the API
            return {
              token: data.token, // Provide a default role if not available
              // Add other user properties if available in the API response
            };
          } else {
            // Token not found in the API response
            console.error("Authentication failed: Token not found");
            return null; // Return null for other API response statuses
          }
        } catch (error) {
          // Handle other errors, such as network issues
          console.error("API Error:", error);
          return null; // Return null for errors
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      if (token) {
        try {
          // Decode the token to get user information
          const decodedToken = jwt.decode(token);

          if (decodedToken) {
            // Assign decoded values to the token
            token.id = decodedToken.id;
            token.email = decodedToken.email;
            token.role = decodedToken.role;
          } else {
            // Handle the case when token decoding fails
            console.error("Token decoding failed");
          }
        } catch (error) {
          // Handle any errors that occur during decoding
          console.error("JWT Decoding Error:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Session callback: This is where you populate the session object
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/login", // Use the custom sign-in page
    newUser: "/register", // Do not use a custom new user creation page
  },
};

export default options;
