import { DEFAULT_VALUE_NUMBER, NEXT_SERVER_RESPONSE } from "@/constants";
import { mapMessageResponse } from "@/helper";
import { getTotalExpense, getTotalIncome, getUserService } from "@/services";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { DirectionParam } from "../type";

const badReqCode = HttpStatusCode.BadRequest;

export const GET = async (req: NextRequest) => {
  const user = await getUserService(req);
  const query = req.nextUrl.searchParams.get("query") as DirectionParam;
  const startDate = req.nextUrl.searchParams.get("startDate");
  const endDate = req.nextUrl.searchParams.get("endDate");

  if (!user)
    return NextResponse.json(
      {
        message: `${NEXT_SERVER_RESPONSE.USER_NOT_FOUND}`,
        error: true,
        code: badReqCode,
      },
      { status: badReqCode }
    );

  if (!query)
    return NextResponse.json(
      {
        message: `${NEXT_SERVER_RESPONSE.BAD_REQUEST}_${mapMessageResponse(
          "get total missing param"
        )}`,
        code: badReqCode,
        error: true,
      },
      { status: badReqCode }
    );

  if (!["income", "expense"].includes(query?.toLowerCase()))
    return NextResponse.json(
      {
        message: mapMessageResponse("query param is invalid"),
        code: badReqCode,
        error: true,
      },
      { status: badReqCode }
    );

  try {
    if (query === "income") {
      const value = await getTotalIncome({
        userId: user.userId,
        startDate: startDate ?? undefined,
        endDate: endDate ?? undefined,
      });

      const sumIncome = value.length
        ? value.reduce((prev, curr) => curr.value + prev, DEFAULT_VALUE_NUMBER)
        : DEFAULT_VALUE_NUMBER;

      return NextResponse.json({
        message: mapMessageResponse(`get total ${query} is success`),
        value: sumIncome,
        count: value.length,
      });
    }

    if (query === "expense") {
      const value = await getTotalExpense({
        userId: user.userId,
        startDate: startDate ?? undefined,
        endDate: endDate ?? undefined,
      });

      const sumExpense = value.length
        ? value.reduce((prev, curr) => curr.value + prev, DEFAULT_VALUE_NUMBER)
        : DEFAULT_VALUE_NUMBER;

      return NextResponse.json({
        message: mapMessageResponse(`get total ${query} is success`),
        value: sumExpense,
        count: value.length,
      });
    }
  } catch (error) {
    console.error(
      `🚀 ===> ${NEXT_SERVER_RESPONSE.SERVER_ERROR}_get_expense`,
      error
    );
    return NextResponse.json(
      {
        message: `${NEXT_SERVER_RESPONSE.SERVER_ERROR}_${mapMessageResponse(
          "get total"
        )}`,
      },
      { status: HttpStatusCode.InternalServerError }
    );
  }
};
