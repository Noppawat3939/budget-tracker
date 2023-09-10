"use client";

import React, { FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextAuthProvider } from "..";

type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NextAuthProvider>{children}</NextAuthProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
