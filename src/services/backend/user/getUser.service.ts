import { NEXT_SERVER_RESPONSE } from "@/constants";
import { PrismaClient } from "@prisma/client";

export const getUserService = async (email: string) => {
  const prisma = new PrismaClient();

  try {
    const foundUser = await prisma.user.findUnique({
      where: { email },
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
