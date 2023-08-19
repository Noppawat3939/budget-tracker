import { ENDPOINT } from "@/constants";
import axios from "axios";

export const getContent = async (param: string) => {
  return await axios.get(ENDPOINT.CONTENT + param);
};

export const createUser = async (body: {
  email: string;
  password: string;
  provider: string;
}) => {
  return await axios.post(ENDPOINT.USER.CREATE, body);
};
