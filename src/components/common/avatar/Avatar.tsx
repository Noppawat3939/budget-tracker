import React from "react";
import {
  AvatarFallback,
  AvatarImage,
  Avatar as ShadAvatar,
} from "@/components/ui/avatar";
import type { AvatarProps } from "./type";

export default function Avatar({ fallback, src }: AvatarProps) {
  return (
    <ShadAvatar className="cursor-pointer hover:opacity-80 transition-all duration-200">
      <AvatarImage src={src} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </ShadAvatar>
  );
}
