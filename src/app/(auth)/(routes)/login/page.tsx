"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components";
import GoogleIcon from "@/assets/icons/google.svg";
import GitHubIcon from "@/assets/icons/github.svg";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

import { signIn } from "next-auth/react";

function Login() {
  return (
    <MainLayout>
      <section className="max-w-lg m-auto flex flex-col justify-center items-center h-full">
        <div className="flex flex-col space-y-8 justify-between">
          <h1 className="text-5xl font-bold text-center">Log in</h1>
          <Button
            size="sm"
            aria-label="google-login-btn"
            variant="outline"
            className="flex max-w-[200px] mx-auto items-center text-gray-500"
            onClick={() => signIn("google")}
          >
            Login with Google
            <Image
              src={GoogleIcon}
              className="ml-3"
              alt="google-logo"
              width={20}
              height={20}
            />
          </Button>
          <Button
            size="sm"
            aria-label="google-login-btn"
            variant="outline"
            className="flex max-w-[200px] mx-auto items-center text-gray-500"
            onClick={() => signIn("github")}
          >
            Login with Github
            <Image
              src={GitHubIcon}
              className="ml-3"
              alt="github-logo"
              width={20}
              height={20}
            />
          </Button>
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
}

export default Login;
