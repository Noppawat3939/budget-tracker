import { createAuthHeader } from "@/helper";
import { ENDPOINT } from "@/constants";
import axios, { type AxiosResponse } from "axios";
import type {
  PutEditBudgetRequest as EditBudgetReq,
  PutEditBudgetResponse as EditedBudgetResp,
} from "./type";

const { BUDGET } = ENDPOINT;

export const editBudget = async (
  params: EditBudgetReq
): Promise<AxiosResponse<EditedBudgetResp>> => {
  return await axios.put(BUDGET.EDIT, params.body, {
    headers: createAuthHeader(params.idToken),
  });
};
