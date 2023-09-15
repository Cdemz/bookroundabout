import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

interface User {
  id: string;
  email: string;
  role: string; // Add the 'role' property
  token: string; // Add the 'token' property
  // Add other user properties as needed
}

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Include req as a parameter if needed
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        try {
          const response = await axios.post(
            "http://booksra.helioho.st/v1/user/login",
            {
              email: credentials.email,
              password: credentials.password,
            }
          );

          if (response.status === 200 && response.data?.user) {
            const user = response.data.user;
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              randomKey: "Hey cool",
              role: "user", // You can set the role as needed
              token: "tokenValue", // You can set the token value as needed
            } as User; // Adjust the return type here
          }
        } catch (error) {
          console.error("Error during API login:", error);
        }

        return null;
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
  pages: {
    signIn: "/login", // Use the custom sign-in page
    newUser: "/register", // Do not use a custom new user creation page
  },
};

export default options;
