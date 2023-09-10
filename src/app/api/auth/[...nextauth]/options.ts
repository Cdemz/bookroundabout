import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

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
          console.log("API Response:", data);

          if (data.token && data.user) {
            // Token successfully retrieved from the API
            return {
              id: data.user.id.toString(),
              email: data.user.email,
              role: data.user.role || "user", // Provide a default role if not available
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
      // JWT callback: This is where you modify the token before it's saved
      if (token) {
        // Modify the token if needed, e.g., decode and assign values
        const { id, email, role } = token;
        token.id = id;
        token.email = email;
        token.role = role;
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
