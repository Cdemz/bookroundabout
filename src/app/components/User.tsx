"use client";

import { useSession } from "next-auth/react";

export default function User() {
  const { data: session } = useSession();
  return (
    <div className="text[var(--color-text)]">{JSON.stringify(session)}</div>
  );
}
