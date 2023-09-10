import { ENDPOINT } from "@/constants";
import axios from "axios";

type IncomeBody = {
  income: {
    income: string;
    value: number;
    description?: string;
  };
};
type ExpenseBody = {
  expense: {
    expense: string;
    value: number;
    description?: string;
  };
};

type PostCreateBudgetRequest = IncomeBody | ExpenseBody;

export const createBudget = async (params: PostCreateBudgetRequest) => {
  return axios.post(
    ENDPOINT.BUDGET.CREATE,
    { params },
    {
      params: {
        create: "income",
      },
    }
  );
};
