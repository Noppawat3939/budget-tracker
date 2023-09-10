import { ENDPOINT } from "@/constants";
import axios from "axios";
import { PostLoginWithSocialRequest } from "./type";

export const loginWithSocial = async (body: PostLoginWithSocialRequest) => {
  return await axios.post(ENDPOINT.AUTH.SOCIAL_LOGIN, body);
};
