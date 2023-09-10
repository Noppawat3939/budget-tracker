import { ENDPOINT } from "@/constants";
import axios from "axios";

export const getContent = async (param: string) => {
  return await axios.get(ENDPOINT.CONTENT + param);
};
