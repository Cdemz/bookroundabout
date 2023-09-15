// import { NextAuthOptions } from "next-auth";
// import GitHubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";
// import jwt from "jsonwebtoken";

// export const options: NextAuthOptions = {
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string,
//     }),
//     CredentialsProvider({
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       authorize: async (credentials: any) => {
//         // Use any here due to type issues
//         try {
//           const res = await fetch("http://booksra.helioho.st/v1/user/login", {
//             method: "POST",
//             body: JSON.stringify(credentials),
//             headers: { "Content-Type": "application/json" },
//           });

//           if (!res.ok) {
//             console.error("API Error: Status Code", res.status);
//             return null;
//           }

//           const data = await res.json();
//           console.log("API Response:", data);

//           if (data.token) {
//             return { token: data.token }
//              // Use type assertion here
//           }

//           return null;
//         } catch (error) {
//           console.error("API Error:", error);
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt(token: any) {
//     // async jwt(token: any, user: any) {
//       // Use any here due to type issues
//       // if (user) {
//         // token.id = user.id;
//         // token.email = user.email;
//         // token.role = user.role;
//       // }
//       // return token;
//     },
//     async session(session: any) {
//       // Use any here due to type issues
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login", // Use the custom sign-in page
//     newUser: "/register", // Do not use a custom new user creation page
//   },
// };

// export default options;
