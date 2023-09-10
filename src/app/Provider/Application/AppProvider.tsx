"use client";

import React, { FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextAuthProvider } from "..";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NextAuthProvider>{children}</NextAuthProvider>
      <ToastContainer autoClose={3000} closeButton={false} theme="colored" />
    </QueryClientProvider>
  );
};

export default AppProvider;
