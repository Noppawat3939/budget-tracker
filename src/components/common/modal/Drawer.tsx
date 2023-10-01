"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { Drawer as VDrawer } from "vaul";
import { DrawerProps } from "./type";
import { useDrawerStore } from "@/store";

export default function Drawer({
  title,
  children,
  drawerHeight,
  btnText,
}: DrawerProps) {
  const { isOpen, onOpenChange, onOpen } = useDrawerStore();

  return (
    <VDrawer.Root
      shouldScaleBackground
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <VDrawer.Trigger asChild>
        <div className="flex">
          <Button onClick={onOpen} className="mx-auto">
            {btnText}
          </Button>
        </div>
      </VDrawer.Trigger>
      <VDrawer.Portal>
        <VDrawer.Overlay className="fixed inset-0 bg-black/50" />
        <VDrawer.Content
          className={`bg-zinc-100 flex flex-col rounded-t-[30px] h-[${
            drawerHeight || "100px"
          }] mt-24 fixed bottom-0 left-0 right-0`}
        >
          <div className="p-4 bg-white rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
            <div className="mx-auto">
              <VDrawer.Title className="text-2xl font-bold mb-[20px]">
                {title}
              </VDrawer.Title>
              {children}
            </div>
          </div>
        </VDrawer.Content>
      </VDrawer.Portal>
    </VDrawer.Root>
  );
}
