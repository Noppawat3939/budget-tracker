import { TBudget } from "@/types";
import { ChartData } from "chart.js";
import { ChangeEvent } from "react";

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
type CreateBudgetFormId = "value" | "description";

export type CreateNewBudgetFormProps = {
  isDisabled?: boolean;
  values: Record<CreateBudget, Record<CreateBudgetFormId, string>>;
  onValueChange: (
    event: ChangeEvent<HTMLInputElement>,
    key: CreateBudget
  ) => void;
  handleAddValues: (key: CreateBudget) => void;
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
