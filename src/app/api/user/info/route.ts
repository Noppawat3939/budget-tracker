import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prismaDb } from "@/lib";
import { checkTokenExpiration, decodedTokenService } from "@/services";

export const POST = async () => {
  const headersInstance = headers();
  const authorization = headersInstance.get("authorization");

  const bearerToken = authorization?.split(" ")[1];

  const { token } = decodedTokenService(bearerToken!);
  const { isExpired } = checkTokenExpiration(token);

  if (!token.email_verified)
    return NextResponse.json(
      { message: "Error email not verified" },
      { status: 400 }
    );

  if (isExpired)
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });

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
      status: 500,
    });
  }
};
