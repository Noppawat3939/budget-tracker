"use client";

import React from "react";
import { MainLayout } from "@/components";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import GoogleIcon from "@/assets/icons/google.svg";

import { signIn } from "next-auth/react";

const LoginContainer = () => {
  const login = [
    {
      provider: "Google",
      icon: GoogleIcon,
    },
  ];

  return (
    <MainLayout>
      <section className="max-w-lg m-auto flex flex-col justify-center items-center h-full">
        <div className="flex flex-col space-y-8 justify-between">
          <h1 className="text-5xl font-bold text-center">Log in</h1>
          {login.map(({ provider, icon }, loginIdx) => (
            <Button
              key={loginIdx}
              size="sm"
              aria-label={`${provider.toLowerCase()}-login-btn`}
              variant="outline"
              className="flex max-w-[240px] mx-auto items-center text-gray-500 font-normal"
              onClick={() => signIn(provider.toLowerCase())}
            >
              {`Continue with ${provider}`}
              <Image
                src={icon}
                className="ml-3"
                alt={`${provider}-logo`}
                width={20}
                height={20}
              />
            </Button>
          ))}
          <Separator />
          <p className="text-center text-xs text-gray-400 font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            perferendis dolore obcaecati omnis saepe aliquam impedit harum
            beatae voluptatibus animi! illum!
          </p>
        </div>
      </section>
    </MainLayout>
  );
};

export default LoginContainer;
