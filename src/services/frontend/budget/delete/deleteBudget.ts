import { ENDPOINT } from "@/constants";
import { createAuthHeader } from "@/helper";
import axios, { type AxiosResponse } from "axios";
import type { DeleteBudgetRequest as DeleteBudgetReq } from "./type";

const { BUDGET } = ENDPOINT;

export const deleteBudget = async (
  params: DeleteBudgetReq
): Promise<AxiosResponse> => {
  return await axios.delete(BUDGET.DELETE, {
    params: params.param,
    headers: createAuthHeader(params.idToken),
  });
};
