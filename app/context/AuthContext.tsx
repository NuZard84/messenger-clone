"use client";

import { SessionProvider } from "next-auth/react";

interface AuthConextProps {
  children: React.ReactNode;
}

export default function AuthConext({ children }: AuthConextProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
