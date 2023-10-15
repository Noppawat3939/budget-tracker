"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Drawer } from "@/components";
import { Button } from "@/components/ui/button";
import type {
  GetCreateBudgetFormsResponse,
  CreateNewBudgetFormProps,
} from "./type";
import { useGetContent, useRenderSkeleton } from "@/hooks";
import { isEmpty } from "lodash";
import { useDrawerStore } from "@/store";
import { BadgeBudget } from ".";
import { Textarea } from "@/components/ui/textarea";
import { useSearchParams } from "next/navigation";
import type { TCreateBudget } from "@/types";
import { EMPTY_STRING } from "@/constants";

export default function CreateNewBudgetForm({
  values,
  isDisabled,
  onValueChange,
  handleAddValues,
  handleRemoveBudgetValue,
  budgetStorage,
  handleCreateNewBudget,
  isPending,
}: CreateNewBudgetFormProps) {
  const { data } = useGetContent<GetCreateBudgetFormsResponse>({
    params: "?form=create-budget",
  });

  const searchParams = useSearchParams();
  const selectedParam = searchParams.get("selected") as TCreateBudget;
  const budgetId = searchParams.get("id");

  const { isOpen } = useDrawerStore((store) => ({
    isOpen: store.isOpen,
  }));

  const [isLoading, setIsLoading] = useState(true);

  const { renderSkeleton } = useRenderSkeleton({
    length: 6,
    isShow: isLoading,
  });

  useEffect(() => {
    if (isOpen) {
      setIsLoading(isOpen);

      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [isOpen]);

  const selectedCreateExpense = selectedParam === "expense";
  const selectedCreateIncome = selectedParam === "income";
  const isShowAddNewButton = selectedCreateExpense || selectedCreateIncome;

  const renderFormContent = () => {
    if (selectedCreateIncome)
      return data?.form.filter((item) => item.key === "income");

    if (selectedCreateExpense)
      return data?.form.filter((item) => item.key === "expense");

    return data?.form;
  };

  const newFormContent = renderFormContent();

  return (
    <Drawer title="Add a new" btnText="Create now">
      <div className="flex-col space-y-3">
        {isLoading ? (
          <React.Fragment>{renderSkeleton}</React.Fragment>
        ) : (
          newFormContent?.map(({ title, forms, key }, index) => (
            <div
              key={`form_${key}_${index}`}
              className={`bg-gray-50 relative py-5 px-6 rounded-md ${
                isShowAddNewButton ? "mb-8" : "mb-0"
              }`}
            >
              <div className="flex items-baseline space-x-2">
                <h1 className="font-bold mb-[20px]">
                  {budgetStorage?.[key]?.length ? `${title}:` : title}
                </h1>
                <span className="flex space-x-2">
                  {budgetStorage?.[key]?.map((value) => (
                    <BadgeBudget
                      key={value?.id}
                      text={value.title || EMPTY_STRING}
                      onClick={() => handleRemoveBudgetValue(key, value.id)}
                    />
                  ))}
                </span>
              </div>
              <Button
                onClick={() =>
                  budgetId ? handleAddValues(key, budgetId) : null
                }
                className={`${
                  isEmpty(values[key].title) || isEmpty(values[key].value)
                    ? "hidden"
                    : "block"
                } absolute text-xs right-2 top-2 ${
                  isShowAddNewButton ? "block" : "hidden"
                }`}
                size="sm"
                type="submit"
                variant="outline"
              >
                {`Add ${key}`}
              </Button>
              <div className="flex space-x-5 mb-2">
                {forms.map(({ id, placeholder, label }, idx) => {
                  if (id !== "description")
                    return (
                      <div key={`${id}_${idx}`} className=" w-auto flex-auto ">
                        <h3
                          className="font-medium w-full mb-3"
                          aria-label={`${label.replaceAll(" ", "-")}-label`}
                        >
                          {label}
                        </h3>
                        <div className="relative items-center flex">
                          <Input
                            inputMode={id === "value" ? "numeric" : "text"}
                            id={id}
                            value={values[key][id]}
                            className={`${
                              id === "value" ? "w-3/4" : "w-full"
                            } outline-none bg-transparent border-hidden focus:border-hidden focus:outline-none focus-within:border-hidden focus-within:outline-none placeholder:text-gray-400`}
                            onChange={(evt) => onValueChange(evt, key)}
                            aria-label={`${id}-input`}
                            placeholder={placeholder}
                          />
                          {id === "value" && values[key].value && (
                            <p className="absolute  right-10">baht</p>
                          )}
                        </div>
                      </div>
                    );
                })}
              </div>
              {forms.map(({ label, id, placeholder }) => {
                if (id === "description")
                  return (
                    <div>
                      <h3
                        className="font-medium w-full mb-3"
                        aria-label={`${label.replaceAll(" ", "-")}-label`}
                      >
                        {label}
                      </h3>
                      <Textarea
                        aria-label={`${id}-of-${key}-text-area`}
                        value={values[key][id]}
                        placeholder={placeholder}
                        id={id}
                        onChange={(evt) => onValueChange(evt, key)}
                        className="resize-none w-full outline-none bg-transparent border-hidden focus:border-hidden focus:outline-none focus-within:border-hidden focus-within:outline-none
                        placeholder:text-gray-400
                        "
                      />
                    </div>
                  );
              })}
            </div>
          ))
        )}
      </div>
      {!isShowAddNewButton && (
        <Button
          onClick={handleCreateNewBudget}
          type="submit"
          className="w-fit mx-auto flex mt-10"
          disabled={isPending || isDisabled}
        >
          Create new
        </Button>
      )}
    </Drawer>
  );
}
