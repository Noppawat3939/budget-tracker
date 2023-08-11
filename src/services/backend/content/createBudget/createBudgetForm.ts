import { CreateBudgetForms } from "./type";

export const createBudgetForms: CreateBudgetForms = [
  {
    title: "💰 Incomes",
    key: "income",
    forms: [
      {
        id: "description",
        label: "Income description",
        placeholder:
          "Add your income categories such as Salary, rent, royalties, dividends, etc.",
        value: "",
      },
      {
        id: "value",
        label: "Income value (฿)",
        placeholder: "Fill in numbers only (0-9)",
        value: "",
      },
    ],
  },
  {
    title: "💸 Expenses",
    key: "expense",
    forms: [
      {
        id: "description",
        label: "Expenses description",
        placeholder:
          "Add your income categories such as Salary, rent, royalties, dividends, etc.",
        value: "",
      },
      {
        id: "value",
        label: "Expenses value (฿)",
        placeholder: "Fill in numbers only (0-9)",
        value: "",
      },
    ],
  },
];
