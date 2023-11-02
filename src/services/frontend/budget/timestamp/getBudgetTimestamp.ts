import { ENDPOINT } from "@/constants";
import axios, { type AxiosResponse } from "axios";
import type {
  GetBudgetTimestampRequest as Req,
  GetBudgetTimestampResponse as Response,
} from "./type";
import { createAuthHeader } from "@/helper";

export const getBudgetTimestamp = async (
  param: Req
): Promise<AxiosResponse<Response>> => {
  return await axios.get(ENDPOINT.BUDGET.GET_TIMESTAMP, {
    headers: createAuthHeader(param.idToken),
  });
};
