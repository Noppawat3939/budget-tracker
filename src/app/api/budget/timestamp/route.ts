import { EMPTY_ARRAY, NEXT_SERVER_RESPONSE } from "@/constants";
import { mapMessageResponse } from "@/helper";
import { getBudgetTimestampService, getUserService } from "@/services";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const user = await getUserService(req);

  if (!user)
    return NextResponse.json(
      {
        message: `${NEXT_SERVER_RESPONSE.USER_NOT_FOUND}`,
        error: true,
        code: HttpStatusCode.BadRequest,
      },
      { status: HttpStatusCode.BadRequest }
    );

  try {
    const res = await getBudgetTimestampService(user.userId);

    const mapData =
      res
        ?.map((res) => res.createdAt)
        ?.sort((a, b) => new Date(a).getTime() - new Date(b).getTime()) ||
      EMPTY_ARRAY;

    return NextResponse.json({
      message: mapMessageResponse("get timestamp success"),
      data: mapData,
    });
  } catch (error) {
    console.error(
      `🚀 ===> ${NEXT_SERVER_RESPONSE.SERVER_ERROR}_get_expense`,
      error
    );
    return NextResponse.json(
      {
        message: `${NEXT_SERVER_RESPONSE.SERVER_ERROR}_${mapMessageResponse(
          "get expense"
        )}`,
      },
      { status: HttpStatusCode.InternalServerError }
    );
  }
};
