import { CreateBudgetForms } from "./type";

export const createBudgetForms: CreateBudgetForms = [
  {
    title: "💰 Incomes",
    key: "income",
    forms: [
      {
        id: "title",
        label: "Income title",
        placeholder: "Add your income categories such as salary, rent etc.",
        value: "",
      },
      {
        id: "value",
        label: "Income value (฿)",
        placeholder: "Fill in numbers only (0-9)",
        value: "",
      },
      {
        id: "description",
        label: "Income description",
        placeholder: "Explain details of your earnings (optional).",
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
        label: "Expenses title",
        placeholder: "Add your expense categories such as food, travel, etc.",
        value: "",
      },
      {
        id: "value",
        label: "Expenses value (฿)",
        placeholder: "Fill in numbers only (0-9)",
        value: "",
      },
      {
        id: "description",
        label: "Expenses description",
        placeholder: "Explain details of expenses (optional).",
        value: "",
      },
    ],
  },
];
