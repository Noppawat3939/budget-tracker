import { FIRST_INDEX, NEXT_SERVER_RESPONSE, SECOND_INDEX } from "@/constants";
import { mapMessageResponse } from "@/helper";
import { prismaDb } from "@/lib";
import { AuthRequest } from "@/types";
import { HttpStatusCode } from "axios";
import { isEmpty } from "lodash";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const POST = async (req: Request) => {
  const body: AuthRequest = await req.json();

  try {
    const user = await prismaDb.user.findMany({
      where: {
        email: body.email,
        provider: body.provider,
      },
    });

    if (isEmpty(user)) {
      const userId = `${body.email.at(0)}${body.provider.slice(
        FIRST_INDEX,
        SECOND_INDEX
      )}-${uuidv4()}`;

      const newUser = await prismaDb.user.create({
        data: {
          userId,
          email: body.email,
          name: body.name,
          provider: body.provider,
          profile: body?.profile,
        },
      });

      return NextResponse.json(
        {
          message: mapMessageResponse("created new user success"),
          user: newUser,
        },
        { status: HttpStatusCode.Created }
      );
    }

    if (!isEmpty(user)) {
      return NextResponse.json({
        message: mapMessageResponse("Login success"),
        user,
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: `${NEXT_SERVER_RESPONSE.SERVER_ERROR}_${mapMessageResponse(
          "login failed"
        )}`,
        error: true,
      },
      { status: HttpStatusCode.InternalServerError }
    );
  }
};
