"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Drawer, Skeleton } from "@/components";
import { Button } from "@/components/ui/button";
import type {
  GetCreateBudgetFormsResponse,
  CreateNewBudgetFormProps,
} from "./type";
import { useGetContent, useRenderSkeleton } from "@/hooks";
import { isEmpty } from "lodash";
import { useDrawerStore } from "@/store";

export default function CreateNewBudgetForm({
  values,
  isDisabled,
  onValueChange,
  handleAddValues,
}: CreateNewBudgetFormProps) {
  const { data } = useGetContent<GetCreateBudgetFormsResponse>({
    params: "?form=create-budget",
  });
  const drawerStore = useDrawerStore();

  const [isLoading, setIsLoading] = useState(true);
  const { renderSkeleton } = useRenderSkeleton({
    length: 6,
    isShow: isLoading,
  });

  useEffect(() => {
    if (drawerStore.isOpen) {
      setIsLoading(drawerStore.isOpen);

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [drawerStore.isOpen]);

  return (
    <Drawer title="Add a new">
      <div className="flex-col space-y-3">
        {isLoading ? (
          <>{renderSkeleton}</>
        ) : (
          data?.form.map(({ title, forms, key }, index) => (
            <div
              key={`form_${key}_${index}`}
              className=" bg-gray-50 relative py-5 px-6 rounded-md"
            >
              <h1 className="font-bold mb-[20px]">
                {title}
                <Skeleton isShow={isLoading} />
              </h1>
              <Button
                onClick={() => handleAddValues(key)}
                className={`${
                  isEmpty(values[key].description) || isEmpty(values[key].value)
                    ? "hidden"
                    : "block"
                } absolute text-xs right-2 top-2`}
                size="sm"
                type="submit"
                variant="outline"
                disabled={isDisabled}
              >
                {`Add ${key}`}
              </Button>
              <div className="flex space-x-5">
                {forms.map(({ id, placeholder, label }, idx) => (
                  <div key={`${id}_${idx}`} className=" w-auto flex-auto ">
                    <h3
                      className="font-medium w-full mb-3"
                      aria-label={`${label.replaceAll(" ", "-")}-label`}
                    >
                      {label}
                    </h3>
                    <Input
                      inputMode={id === "value" ? "numeric" : "text"}
                      id={id}
                      value={values[key][id]}
                      className="w-full outline-none bg-transparent border-hidden focus:border-hidden focus:outline-none focus-within:border-hidden focus-within:outline-none"
                      onChange={(evt) => onValueChange(evt, key)}
                      aria-label={`${id}-input`}
                      placeholder={placeholder}
                      disabled={isDisabled}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <Button
        disabled={isDisabled}
        type="submit"
        className="w-fit flex mx-auto mt-10"
      >
        Create new
      </Button>
    </Drawer>
  );
}
