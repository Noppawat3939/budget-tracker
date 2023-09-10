import { TBudget, TCreateBudget } from "@/types";
import { ChartData } from "chart.js";
import { ChangeEvent } from "react";
import { TBudgetValues } from "../hooks/type";

export type DoughnutCardProps = {
  data: ChartData<"doughnut", number[], string>;
};

export type SummaryCardProps = {
  end: number;
  start?: number;
  isMounted: boolean;
  data: { order: string; price: number; type: TBudget; description?: string }[];
};

type CreateBudget = "income" | "expense";
type CreateBudgetFormId = "value" | "description" | "title";

export type CreateNewBudgetFormProps = {
  isDisabled?: boolean;
  values: Record<CreateBudget, Record<CreateBudgetFormId, string>>;
  onValueChange: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    key: CreateBudget
  ) => void;
  handleAddValues: (key: CreateBudget) => void;
  handleRemoveBudgetValue: (key: CreateBudget, id: string) => void;
  budgetStorage: Record<TCreateBudget, TBudgetValues[]>;
};

export type CreateBudgetForms = {
  title: string;
  key: CreateBudget;
  forms: {
    id: CreateBudgetFormId;
    label: string;
    placeholder: string;
    value: string;
  }[];
}[];

export type GetCreateBudgetFormsResponse = { form: CreateBudgetForms };
