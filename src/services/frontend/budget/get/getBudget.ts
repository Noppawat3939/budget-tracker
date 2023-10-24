import { ENDPOINT } from "@/constants";
import axios, { type AxiosResponse } from "axios";
import type {
  GetAllBudgetRequest as GetBudgetsReq,
  GetAllBudgetResponse as GetBudgetsResp,
  GetBudgetBalanceByBudgetIdRequest as GetBudgetBalanceReq,
  GetBudgetBalanceByBudgetIdResponse as GetBudgetBalanceResp,
  GetBudgetBalanceRequest as GetBalanceReq,
  GetBudgetBalanceResponse as GetBalanceResp,
  GetBudgetByBudgetIdRequest as GetBudgetReq,
  GetBudgetByBudgetIdResponse as GetBudgetResp,
  GetBudgetByQuerySearchRequest as GetBudgetBySearchReq,
  GetBudgetByQuerySearchResponse as GetBudgetBySearchResp,
  GetExpenseDataRequest as GetExpensesReq,
  GetExpenseDataResponse as GetExpensesResp,
  GetIncomeDataRequest as GetIncomesReq,
  GetIncomeDataResponse as GetIncomesResp,
  GetTotalBudgetRequest as GetTotalReq,
  GetTotalBudgetResponse as GetTotalResp,
} from "./type";
import { createAuthHeader } from "@/helper";

const { BUDGET } = ENDPOINT;

export const getAllBudget = async (
  param: GetBudgetsReq
): Promise<AxiosResponse<GetBudgetsResp>> => {
  return await axios.get(BUDGET.GET, {
    headers: createAuthHeader(param.idToken),
  });
};

export const getBudgetByBudgetId = async (
  params: GetBudgetReq
): Promise<AxiosResponse<GetBudgetResp>> => {
  return await axios.get(BUDGET.GET, {
    params: {
      budgetId: params.budgetId,
      direction: params.direction,
    },
    headers: createAuthHeader(params.idToken),
  });
};

export const getBudgetBalance = async (
  param: GetBalanceReq
): Promise<AxiosResponse<GetBalanceResp>> => {
  return await axios.get(BUDGET.BALANCE, {
    headers: createAuthHeader(param.idToken),
  });
};

export const getBudgetBalanceByBudgetId = async (
  params: GetBudgetBalanceReq
): Promise<AxiosResponse<GetBudgetBalanceResp>> => {
  return await axios.get(BUDGET.BALANCE, {
    headers: createAuthHeader(params.idToken),
    params: { budgetId: params.budgetId },
  });
};

export const getBudgetByQuerySearch = async (
  params: GetBudgetBySearchReq
): Promise<AxiosResponse<GetBudgetBySearchResp>> => {
  return await axios.get(BUDGET.GET, {
    params: {
      search: params.search,
    },
    headers: createAuthHeader(params.idToken),
  });
};

export const getExpenseData = async (
  params: GetExpensesReq
): Promise<AxiosResponse<GetExpensesResp>> => {
  return await axios.get(`${BUDGET.GET}/expense`, {
    headers: createAuthHeader(params.idToken),
  });
};

export const getIncomeData = async (
  params: GetIncomesReq
): Promise<AxiosResponse<GetIncomesResp>> => {
  return await axios.get(`${BUDGET.GET}/income`, {
    headers: createAuthHeader(params.idToken),
  });
};

export const getBudgetTotal = async ({
  idToken,
  startDate,
  endDate,
  query,
}: GetTotalReq): Promise<AxiosResponse<GetTotalResp>> => {
  return axios.get(BUDGET.GET_TOTAL, {
    headers: createAuthHeader(idToken),
    params: { startDate, endDate, query },
  });
};
