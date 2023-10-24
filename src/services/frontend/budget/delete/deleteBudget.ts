import { ENDPOINT } from "@/constants";
import { createAuthHeader } from "@/helper";
import axios, { type AxiosResponse } from "axios";
import type { DeleteBudgetRequest as deleteBudgetReq } from "./type";

const { BUDGET } = ENDPOINT;

export const deleteBudget = async (
  params: deleteBudgetReq
): Promise<AxiosResponse> => {
  return await axios.delete(BUDGET.DELETE, {
    params: params.param,
    headers: createAuthHeader(params.idToken),
  });
};
