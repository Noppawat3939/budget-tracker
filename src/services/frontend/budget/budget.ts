import { ENDPOINT } from "@/constants";
import axios, { AxiosResponse } from "axios";
import type {
  GetAllBudgetRequest,
  GetAllBudgetResponse,
  GetBudgetBalanceByBudgetIdRequest,
  GetBudgetBalanceByBudgetIdResponse,
  GetBudgetBalanceRequest,
  GetBudgetBalanceResponse,
  PostCreateIncomeExpenseRequest,
  PostCreateNewBudgetRequest,
  PostCreateNewBudgetResponse,
} from "./type";

export const createNewBudget = async ({
  body,
  idToken,
}: PostCreateNewBudgetRequest): Promise<
  AxiosResponse<PostCreateNewBudgetResponse>
> => {
  return axios.post(ENDPOINT.BUDGET.CREATE, body, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
};

export const createIncomeOrExpense = async ({
  body,
  query,
  idToken,
}: PostCreateIncomeExpenseRequest) => {
  return axios.post(ENDPOINT.BUDGET.CREATE + "?" + query, body, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
};

export const getAllBudget = async (
  param: GetAllBudgetRequest
): Promise<AxiosResponse<GetAllBudgetResponse>> => {
  return await axios.get(ENDPOINT.BUDGET.GET, {
    headers: {
      Authorization: `Bearer ${param.idToken}`,
    },
  });
};

export const getBudgetBalance = async (
  param: GetBudgetBalanceRequest
): Promise<AxiosResponse<GetBudgetBalanceResponse>> => {
  return await axios.get(ENDPOINT.BUDGET.BALANCE, {
    headers: { Authorization: `Bearer ${param.idToken}` },
  });
};

export const getBudgetBalanceByBudgetId = async (
  params: GetBudgetBalanceByBudgetIdRequest
): Promise<AxiosResponse<GetBudgetBalanceByBudgetIdResponse>> => {
  return await axios.get(ENDPOINT.BUDGET.BALANCE, {
    headers: { Authorization: `Bearer ${params.idToken}` },
    params: { budgetId: params.budgetId },
  });
};
