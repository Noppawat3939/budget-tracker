import { ENDPOINT } from "@/constants";
import axios, { type AxiosResponse } from "axios";
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
  GetExpenseDataRequest,
  GetExpenseDataResponse,
  GetIncomeDataRequest,
  GetIncomeDataResponse,
  GetTotalBudgetRequest,
  GetTotalBudgetResponse,
} from "./type";
import { createAuthHeader } from "@/helper";

const { BUDGET } = ENDPOINT;

export const getAllBudget = async (
  param: GetAllBudgetRequest
): Promise<AxiosResponse<GetAllBudgetResponse>> => {
  return await axios.get(BUDGET.GET, {
    headers: createAuthHeader(param.idToken),
  });
};

export const getBudgetByBudgetId = async (
  params: GetBudgetByBudgetIdRequest
): Promise<AxiosResponse<GetBudgetByBudgetIdResponse>> => {
  return await axios.get(BUDGET.GET, {
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
  return await axios.get(BUDGET.BALANCE, {
    headers: createAuthHeader(param.idToken),
  });
};

export const getBudgetBalanceByBudgetId = async (
  params: GetBudgetBalanceByBudgetIdRequest
): Promise<AxiosResponse<GetBudgetBalanceByBudgetIdResponse>> => {
  return await axios.get(BUDGET.BALANCE, {
    headers: createAuthHeader(params.idToken),
    params: { budgetId: params.budgetId },
  });
};

export const getBudgetByQuerySearch = async (
  params: GetBudgetByQuerySearchRequest
): Promise<AxiosResponse<GetBudgetByQuerySearchResponse>> => {
  return await axios.get(BUDGET.GET, {
    params: {
      search: params.search,
    },
    headers: createAuthHeader(params.idToken),
  });
};

export const getExpenseData = async (
  params: GetExpenseDataRequest
): Promise<AxiosResponse<GetExpenseDataResponse>> => {
  return await axios.get(`${BUDGET.GET}/expense`, {
    headers: createAuthHeader(params.idToken),
  });
};

export const getIncomeData = async (
  params: GetIncomeDataRequest
): Promise<AxiosResponse<GetIncomeDataResponse>> => {
  return await axios.get(`${BUDGET.GET}/income`, {
    headers: createAuthHeader(params.idToken),
  });
};

export const getBudgetTotal = async ({
  idToken,
  startDate,
  endDate,
}: GetTotalBudgetRequest): Promise<AxiosResponse<GetTotalBudgetResponse>> => {
  return axios.get(BUDGET.GET_TOTAL, {
    headers: createAuthHeader(idToken),
    params: { startDate, endDate },
  });
};
