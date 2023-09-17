/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useLayoutEffect, useState } from "react";

type UseMounted = boolean;

export default function useMounted(delay?: number): UseMounted {
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    if (!mounted) setTimeout(() => setMounted(true), delay || 500);
  }, []);

  return mounted;
}
