import { ENDPOINT } from "@/constants";
import axios from "axios";

type IncomeRequest = {
  income: {
    income: string;
    value: number;
    description?: string;
  };
};
type ExpenseRequest = {
  expense: {
    expense: string;
    value: number;
    description?: string;
  };
};

type PostCreateNewBudgetRequest = IncomeRequest & ExpenseRequest;

export const createNewBudget = async (params: PostCreateNewBudgetRequest) => {
  return axios.post(ENDPOINT.BUDGET.CREATE, params, {
    // headers: {
    //   Authorization: "Bearer " ,
    // },
  });
};

type PostCreateIncomeExpenseRequest = {
  body: IncomeRequest | ExpenseRequest;
  query: "income" | "expense";
  idToken: string;
};

export const createIncomeOrExpense = async ({
  body,
  query,
  idToken,
}: PostCreateIncomeExpenseRequest) => {
  return axios.post(ENDPOINT.BUDGET.CREATE + "?" + query, body, {
    headers: {
      Authorization: "Bearer " + idToken,
    },
  });
};
