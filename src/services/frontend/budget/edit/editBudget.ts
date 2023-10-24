import { createAuthHeader } from "@/helper";
import { ENDPOINT } from "@/constants";
import axios, { type AxiosResponse } from "axios";
import type {
  PutEditBudgetRequest as editBudgetReq,
  PutEditBudgetResponse as editedBudgetResp,
} from "./type";

const { BUDGET } = ENDPOINT;

export const editBudget = async (
  params: editBudgetReq
): Promise<AxiosResponse<editedBudgetResp>> => {
  return await axios.put(BUDGET.EDIT, params.body, {
    headers: createAuthHeader(params.idToken),
  });
};
