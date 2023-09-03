import jwtDecode from "jwt-decode";
import type { JwtToken } from "@/types";
import { NextRequest } from "next/server";
import { NEXT_SERVER_REQUEST } from "@/constants";

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

export const getHeadersToken = (authorizeToken: string) => {
  const bearerToken = authorizeToken.split(" ")?.[1];

  if (bearerToken) {
    const { token } = decodedTokenService(bearerToken);

    return token;
  }
};

export const getAuthToken = ({ request }: { request: NextRequest }) => {
  const authorizeToken = request.headers?.get(NEXT_SERVER_REQUEST.HEADERS.AUTH);

  if (authorizeToken) {
    const token = getHeadersToken(authorizeToken);

    if (token) return token;
  }
};
