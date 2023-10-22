import type { TCreateBudget } from "@/types";

type CreateBudgetFormId = "value" | "description" | "title";

type CreateBudgetForms = {
  title: string;
  key: TCreateBudget;
  forms: {
    id: CreateBudgetFormId;
    label: string;
    placeholder: string;
    value: string;
  }[];
}[];

export type CreateBudgetContentForm = { form: CreateBudgetForms };
