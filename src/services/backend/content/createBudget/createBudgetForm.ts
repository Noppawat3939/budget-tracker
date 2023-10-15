import { CreateBudgetForms } from "./type";

export const createBudgetForms: CreateBudgetForms = [
  {
    title: "💰 Incomes",
    key: "income",
    forms: [
      {
        id: "title",
        label: "Income",
        placeholder: "Add your income categories such as salary, rent etc.",
        value: "",
      },
      {
        id: "value",
        label: "Value (฿)",
        placeholder: "Fill in numbers only (0-9)",
        value: "",
      },
      {
        id: "description",
        label: "Note (optional)",
        placeholder: "Explain details of your earnings.",
        value: "",
      },
    ],
  },
  {
    title: "💸 Expenses",
    key: "expense",
    forms: [
      {
        id: "title",
        label: "Expenses",
        placeholder: "Add your expense categories such as food, travel, etc.",
        value: "",
      },
      {
        id: "value",
        label: "Value (฿)",
        placeholder: "Fill in numbers only (0-9)",
        value: "",
      },
      {
        id: "description",
        label: "Note (optional)",
        placeholder: "Explain details of expenses.",
        value: "",
      },
    ],
  },
];
