type CreateBudget = "income" | "expense";
type CreateBudgetFormId = "value" | "description";

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
