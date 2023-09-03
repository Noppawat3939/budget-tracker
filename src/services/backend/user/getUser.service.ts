import { NEXT_SERVER_RESPONSE } from "@/constants";
import { PrismaClient } from "@prisma/client";
import { getAuthToken } from "..";
import { NextRequest } from "next/server";

export const getUserService = async (req: NextRequest) => {
  const prisma = new PrismaClient();

  const token = getAuthToken({ request: req });

  if (!token?.email) return;

  try {
    const foundUser = await prisma.user.findUnique({
      where: { email: token?.email },
    });

    return foundUser;
  } catch (error) {
    console.log(
      `🚀 ===> ${NEXT_SERVER_RESPONSE.SERVER_ERROR}_get_user_service:`,
      error
    );

    throw new Error();
  }
};
