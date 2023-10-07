import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest & { token: string }) => {
  const regex = new RegExp("/api/*");

  if (regex.test(request.url)) {
    return NextResponse.next();
  }

  return NextResponse.next();
};

export const config = {
  matcher: "/api/:path*",
};
