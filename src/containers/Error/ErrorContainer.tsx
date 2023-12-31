"use client";

import React, { memo, type FC, useTransition } from "react";
import type { ErrorContainerProps } from "./type";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BiSolidError } from "react-icons/bi";
import { ROUTES } from "@/constants";

const ErrorContainer: FC<ErrorContainerProps> = ({
  onClick,
  header,
  description,
  isDisabled,
}) => {
  const { push } = useRouter();
  const [isPending, startTransition] = useTransition();

  const backToHome = () => push(ROUTES.MAIN);

  return (
    <section
      className="flex h-screen items-center justify-center"
      about="error-section"
    >
      <div className="flex-col flex justify-center text-center">
        <h1 className="text-[3rem] font-medium flex">
          <BiSolidError className="text-red-600 mr-4" />
          {header || "Sorry, error occurred"}
        </h1>
        <p className="text-xl font-medium">
          {description ||
            "At this time, the <page_name> information is not yet known."}
        </p>
        <footer about="footer-error" className="justify-center space-x-4 flex">
          <Button
            disabled={isPending || isDisabled}
            className="mt-[5%] w-[180px]"
            onClick={(_arg) => startTransition(() => onClick?.(_arg))}
          >
            Try again
          </Button>
          <Button
            disabled={isPending}
            className="mt-[5%] w-[180px]"
            variant="outline"
            onClick={backToHome}
          >
            Back to home
          </Button>
        </footer>
      </div>
    </section>
  );
};

export default memo(ErrorContainer);
