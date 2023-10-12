import { ENDPOINT } from "@/constants";
import axios, { AxiosResponse } from "axios";
import type {
  GetAllBudgetRequest,
  GetAllBudgetResponse,
  GetBudgetBalanceByBudgetIdRequest,
  GetBudgetBalanceByBudgetIdResponse,
  GetBudgetBalanceRequest,
  GetBudgetBalanceResponse,
  GetBudgetByBudgetIdRequest,
  GetBudgetByBudgetIdResponse,
  GetBudgetByQuerySearchRequest,
  GetBudgetByQuerySearchResponse,
  PostCreateIncomeOrExpenseRequest,
  PostCreateIncomeOrExpenseResponse,
  PostCreateNewBudgetRequest,
  PostCreateNewBudgetResponse,
} from "./type";
import { createAuthHeader } from "@/helper";

export const createNewBudget = async ({
  body,
  idToken,
}: PostCreateNewBudgetRequest): Promise<
  AxiosResponse<PostCreateNewBudgetResponse>
> => {
  return axios.post(ENDPOINT.BUDGET.CREATE, body, {
    headers: createAuthHeader(idToken),
  });
};

export const createIncomeOrExpense = async ({
  body,
  query,
  idToken,
}: PostCreateIncomeOrExpenseRequest): Promise<
  AxiosResponse<PostCreateIncomeOrExpenseResponse>
> => {
  return axios.post(`${ENDPOINT.BUDGET.CREATE}?${query}`, body, {
    headers: createAuthHeader(idToken),
  });
};

export const getAllBudget = async (
  param: GetAllBudgetRequest
): Promise<AxiosResponse<GetAllBudgetResponse>> => {
  return await axios.get(ENDPOINT.BUDGET.GET, {
    headers: createAuthHeader(param.idToken),
  });
};

export const getBudgetByBudgetId = async (
  params: GetBudgetByBudgetIdRequest
): Promise<AxiosResponse<GetBudgetByBudgetIdResponse>> => {
  return await axios.get(ENDPOINT.BUDGET.GET, {
    params: {
      budgetId: params.budgetId,
      direction: params.direction,
    },
    headers: createAuthHeader(params.idToken),
  });
};

export const getBudgetBalance = async (
  param: GetBudgetBalanceRequest
): Promise<AxiosResponse<GetBudgetBalanceResponse>> => {
  return await axios.get(ENDPOINT.BUDGET.BALANCE, {
    headers: createAuthHeader(param.idToken),
  });
};

export const getBudgetBalanceByBudgetId = async (
  params: GetBudgetBalanceByBudgetIdRequest
): Promise<AxiosResponse<GetBudgetBalanceByBudgetIdResponse>> => {
  return await axios.get(ENDPOINT.BUDGET.BALANCE, {
    headers: createAuthHeader(params.idToken),
    params: { budgetId: params.budgetId },
  });
};

export const getBudgetByQuerySearch = async (
  params: GetBudgetByQuerySearchRequest
): Promise<AxiosResponse<GetBudgetByQuerySearchResponse>> => {
  return await axios.get(ENDPOINT.BUDGET.GET, {
    params: {
      search: params.search,
    },
    headers: createAuthHeader(params.idToken),
  });
};
