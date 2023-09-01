import { NextRequest, NextResponse } from "next/server";
import { decodedTokenService } from "./services";

export const middleware = (request: NextRequest & { token: string }) => {
  const regex = new RegExp("/api/*");

  if (regex.test(request.url)) {
    //TODO: handle middleware

    return NextResponse.next();
  }

  return NextResponse.next();
};

export const config = {
  matcher: "/api/:path*",
};
