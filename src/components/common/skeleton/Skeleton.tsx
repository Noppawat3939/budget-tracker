import React from "react";
import { Skeleton as ShadSkeleton } from "@/components/ui/skeleton";
import { SkeletonProps } from "./type";

export default function Skeleton({ isShow }: SkeletonProps) {
  return (
    <ShadSkeleton
      className={`${isShow ? "block" : "hidden"} w-full h-[20px]`}
    />
  );
}
