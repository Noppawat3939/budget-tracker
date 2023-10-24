import { createAuthHeader } from "@/helper";
import axios, { AxiosResponse } from "axios";
import { ENDPOINT } from "@/constants";
import type {
  PostCreateIncomeOrExpenseRequest as createIncomeOrExpenseReq,
  PostCreateIncomeOrExpenseResponse as createdIncomeOrExpenseResp,
  PostCreateNewBudgetRequest as createBudgetReq,
  PostCreateNewBudgetResponse as createdBudgetResp,
} from "./type";

const { BUDGET } = ENDPOINT;

export const createNewBudget = async ({
  body,
  idToken,
}: createBudgetReq): Promise<AxiosResponse<createdBudgetResp>> => {
  return axios.post(BUDGET.CREATE, body, {
    headers: createAuthHeader(idToken),
  });
};

export const createIncomeOrExpense = async ({
  body,
  query,
  idToken,
}: createIncomeOrExpenseReq): Promise<
  AxiosResponse<createdIncomeOrExpenseResp>
> => {
  return axios.post(`${BUDGET.CREATE}?${query}`, body, {
    headers: createAuthHeader(idToken),
  });
};
