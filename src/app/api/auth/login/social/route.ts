import { prismaDb } from "@/lib";
import { AuthRequest } from "@/types";
import { HttpStatusCode } from "axios";
import { isEmpty } from "lodash";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const POST = async (req: Request) => {
  const body: AuthRequest = await req.json();

  try {
    const found = await prismaDb.user.findMany({
      where: {
        email: body.email,
        provider: body.provider,
      },
    });

    if (isEmpty(found)) {
      const userId = `${body.email.at(0)}${body.provider.slice(
        0,
        1
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
        { message: "Created new user success", user: newUser },
        { status: HttpStatusCode.Created }
      );
    }

    if (!isEmpty(found)) {
      return NextResponse.json({ message: "Login success", user: found });
    }
  } catch (error) {
    return new NextResponse("Internal error", {
      status: HttpStatusCode.InternalServerError,
    });
  }
};
