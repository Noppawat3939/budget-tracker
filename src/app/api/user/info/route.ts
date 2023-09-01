import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { decodedTokenService, getUserService } from "@/services";
import { HttpStatusCode } from "axios";
import { NEXT_SERVER_REQUEST, NEXT_SERVER_RESPONSE } from "@/constants";

export const POST = async () => {
  const headersInstance = headers();
  const authorization = headersInstance.get(NEXT_SERVER_REQUEST.HEADERS.AUTH);

  const bearerToken = authorization?.split(" ")[1];

  const { token } = decodedTokenService(bearerToken!);

  if (!token)
    return NextResponse.json(
      { message: "Invalid token" },
      { status: HttpStatusCode.Unauthorized }
    );

  if (!token.email_verified)
    return NextResponse.json(
      { message: "Error email not verified" },
      { status: HttpStatusCode.BadRequest }
    );

  try {
    const foundUser = getUserService(token?.email);

    return NextResponse.json({ user: foundUser });
  } catch (error) {
    console.log(`${NEXT_SERVER_RESPONSE.SERVER_ERROR}_get_user_info`);
    return new NextResponse(NEXT_SERVER_RESPONSE.SERVER_ERROR, {
      status: HttpStatusCode.InternalServerError,
    });
  }
};
