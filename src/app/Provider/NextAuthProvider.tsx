"use client";
import { SessionProvider } from "next-auth/react";
import { NextAuthProviderProps } from "./type";

function NextAuthProvider({ children }: NextAuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default NextAuthProvider;
