// import type { NextAuthOptions } from "next-auth";
// import { JWT } from "next-auth/jwt";
// import GitHubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";

// // Define a custom user type that matches your user data structure
// interface User {
//   id: string;
//   role: string;
//   email: string;
//   // Add any other fields you need
// }

// interface Credentials {
//   email: string;
//   password: string;
// }

// export const options: NextAuthOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string,
//     }),
//     CredentialsProvider({
//       name: "Sign in",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },

//       authorize: async (credentials) => {
//         // You can implement your authentication logic here.
//         // Send credentials to your API and get the token
//         const response = await fetch('http://booksra.helioho.st/v1/user/login', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(credentials),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           // Return an object with user data and token
//           return Promise.resolve(data);
//         } else {
//           // Return null if authentication failed
//           return Promise.resolve(null);
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt(token: JWT, user: User | null) {
//       // Add the user data to the token
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//         token.email = user.email;
//         // Add any other fields you need from the user data
//       }
//       return token; // Return the updated token
//     },
//   },
//   pages: {
//     signIn: "/login",
//     newUser: "/register",
//   },
// };

// export default options;

// import type { NextAuthOptions } from "next-auth";
// import { Session } from "next-auth"; // Import Session and JWT types
// import { JWT } from "next-auth/jwt";
// import GitHubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";
// import axios from "axios";
// import { NextApiRequest } from 'next';// Import NextApiRequest and NextApiResponse
// import { AdapterUser} from 'next-auth/adapters';

// // Define a custom user type that matches your user data structure
// interface User {
//   id: string;
//   role: string;
//   firstName: string;
//   lastName: string;
//   country: string;
//   companyName: string;
//   address: string;
//   zipCode: string;
//   state: string;
//   phoneNumber: string;
//   email: string;
//   password: string;
//   passwordConfirm: string;
//   city: string;
//   token: string;
//   accessToken: string;
//   expires: string;
//   jwt: string;

// }

// interface Credentials {
//   email: string;
//   password: string;
// }

// interface CustomSession extends Session {
//   jwt: string;
// }

// const AUTHENTICATION = axios.create(); // Create Axios instance for authentication requests
// const USERS = axios.create(); // Create Axios instance for user requests

// // Configure Axios instances as needed (base URL, headers, etc.)

// type CustomNextApiRequest = NextApiRequest & {

//   // Add any additional properties you need here
// };

// export const options: NextAuthOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string,
//     }),
//     CredentialsProvider({
//       name: "Sign in",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },

//       authorize: async (credentials) => {
//         // Your authorization logic here
//         if (!credentials) {
//           return null;
//         }

//         const { email, password } = credentials;

//         // Request to sign in using the AUTHENTICATION Axios instance
//         const signInRequest = await AUTHENTICATION.post(
//           'http://booksra.helioho.st/v1/user/login',
//           { email, password },
//           { headers: { 'Content-Type': 'application/json' } }
//         );

//         const { data } = signInRequest;
//         const { accessToken } = data;

//         // After sign-in, request user data to create a session with a complete profile
//         const userRequest = await USERS.get(
//           'http://booksra.helioho.st/v1/user',
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               'Content-Type': 'application/json',
//             },
//           }
//         );

//         const { data: userData } = userRequest;

//         if ((userRequest.status as number) === 200) {
//           const user: User = { ...userData, accessToken };
//           return user;
//         }

//         throw new Error(data);
//       }
//     }),
//   ],
//   callbacks: {
//     jwt: async ({ token, user }) => {
//       // user is only available the first time a user signs in authorized
//       if (user && typeof user === 'object' && 'jwt' in user && typeof user.jwt === 'string') {
//         return {
//           ...token,
//           jwt: user.jwt,
//         };
//       }
//       return token;
//      },
//      session: async ({ session, token }) => {
//       if (token) {
//         const customSession = session as CustomSession;
//         customSession.jwt = token.jwt;
//         return customSession;
//       }
//       return session;
//     },
//  },
//   pages: {
//     signIn: "/login",
//     newUser: "/register",
//   },
// };

// export default options;
