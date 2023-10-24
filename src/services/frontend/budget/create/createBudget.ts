import { createAuthHeader } from "@/helper";
import axios, { AxiosResponse } from "axios";
import { ENDPOINT } from "@/constants";
import type {
  PostCreateIncomeOrExpenseRequest as CreateIncomeOrExpenseReq,
  PostCreateIncomeOrExpenseResponse as CreatedIncomeOrExpenseResp,
  PostCreateNewBudgetRequest as CreateBudgetReq,
  PostCreateNewBudgetResponse as CreatedBudgetResp,
} from "./type";

const { BUDGET } = ENDPOINT;

export const createNewBudget = async ({
  body,
  idToken,
}: CreateBudgetReq): Promise<AxiosResponse<CreatedBudgetResp>> => {
  return axios.post(BUDGET.CREATE, body, {
    headers: createAuthHeader(idToken),
  });
};

export const createIncomeOrExpense = async ({
  body,
  query,
  idToken,
}: CreateIncomeOrExpenseReq): Promise<
  AxiosResponse<CreatedIncomeOrExpenseResp>
> => {
  return axios.post(`${BUDGET.CREATE}?${query}`, body, {
    headers: createAuthHeader(idToken),
  });
};
