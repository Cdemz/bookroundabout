// AuthProvider.tsx
"use client";
import { SessionProvider } from "next-auth/react";

export default function AuthProvider({
  children,
  session, // Pass the session data as a prop
}: {
  children: React.ReactNode;
  session: any; // Adjust the type as needed
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
