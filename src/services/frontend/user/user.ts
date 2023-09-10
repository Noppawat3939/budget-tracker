import { ENDPOINT } from "@/constants";
import axios, { type AxiosResponse } from "axios";
import { PostGetUserRequest, PostGetUserResponse } from "./type";

export const getUserInfo = async ({
  token,
}: PostGetUserRequest): Promise<AxiosResponse<PostGetUserResponse>> => {
  const res = await axios.post(
    ENDPOINT.USER,
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return res;
};
