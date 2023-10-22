import { TCreateBudget } from "@/types";
import { ChangeEvent } from "react";

type CreateBudget = "income" | "expense";
type CreateBudgetFormId = "value" | "description" | "title";
type BudgetValues = {
  id: string;
  title: string;
  description?: string;
  value: string;
  createdAt: string;
};
type CreateBudgetForms = {
  title: string;
  key: CreateBudget;
  forms: {
    id: CreateBudgetFormId;
    label: string;
    placeholder: string;
    value: string;
  }[];
}[];

export type CreateNewBudgetFormProps = {
  isDisabled?: boolean;
  isPending?: boolean;
  values: Record<CreateBudget, Record<CreateBudgetFormId, string>>;
  onValueChange: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    key: CreateBudget
  ) => void;
  handleAddValues: (key: CreateBudget, budgetId: string) => void;
  handleRemoveBudgetValue: (key: CreateBudget, id: string) => void;
  budgetStorage: Record<TCreateBudget, BudgetValues[]>;
  handleCreateNewBudget: () => void;
  isNoExpenseData?: boolean;
};

export type CreateBudgetContentForm = { form: CreateBudgetForms };
