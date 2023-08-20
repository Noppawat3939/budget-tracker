import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prismaDb } from "@/lib";
import { decodedTokenService } from "@/services";
import { HttpStatusCode } from "axios";

export const POST = async () => {
  const headersInstance = headers();
  const authorization = headersInstance.get("authorization");

  const bearerToken = authorization?.split(" ")[1];

  const { token } = decodedTokenService(bearerToken!);

  if (!token.email_verified)
    return NextResponse.json(
      { message: "Error email not verified" },
      { status: HttpStatusCode.BadRequest }
    );

  try {
    const foundUser = await prismaDb.user.findFirst({
      where: {
        email: token?.email,
        name: token?.name,
      },
    });

    return NextResponse.json({ user: foundUser });
  } catch (error) {
    return new NextResponse("Internal Server Error get user info", {
      status: HttpStatusCode.InternalServerError,
    });
  }
};
