import React from "react";
import { Separator } from "@/components/ui/separator";
import DarkLogo from "@/assets/logo/dark-logo.png";
import Image from "next/image";

const MainFooter = () => {
  return (
    <footer className="min-h-[180px] mt-10">
      <Separator />
      <div className="flex items-center space-x-2 justify-center mt-[5%]">
        <Image
          src={DarkLogo}
          alt="logo"
          className="w-[28px] h-[26px] rounded-md"
        />
        <h1 className="font-semibold text-black">Budget Tracker</h1>
      </div>
    </footer>
  );
};

export default MainFooter;
