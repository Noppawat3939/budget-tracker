import jwtDecode from "jwt-decode";
import type { JwtToken } from "@/types";

const CONVERT_TIME = 1000;

export const decodedTokenService = (idToken: string) => {
  const token: JwtToken = jwtDecode(idToken || "");

  return { token };
};

export const checkTokenExpiration = (token: JwtToken) => {
  const now = Date.now();
  const isExpired = now > token.exp * CONVERT_TIME;

  return { isExpired };
};
