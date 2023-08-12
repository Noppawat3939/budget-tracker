"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Drawer } from "@/components";
import { Button } from "@/components/ui/button";
import type {
  GetCreateBudgetFormsResponse,
  CreateNewBudgetFormProps,
} from "./type";
import { useGetContent } from "@/hooks";

export default function CreateNewBudgetForm({
  values,
  isDisabled,
  onValueChange,
}: CreateNewBudgetFormProps) {
  const { data } = useGetContent<GetCreateBudgetFormsResponse>({
    params: "?form=create-budget",
  });

  return (
    <Drawer title="Add a new">
      <div className="flex-col space-y-3">
        {data?.form.map(({ title, forms, key }, index) => (
          <div
            key={`form_${key}_${index}`}
            className=" bg-gray-50 relative py-5 px-6 rounded-md"
          >
            <h1 className="font-bold mb-[20px]">{title}</h1>
            <Button
              className={`absolute text-xs right-2 top-2`}
              size="sm"
              type="submit"
              variant="outline"
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
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
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
