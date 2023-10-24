import { EMPTY_ARRAY, NEXT_SERVER_RESPONSE } from "@/constants";
import { mapMessageResponse } from "@/helper";
import { getExpenseDataService, getUserService } from "@/services";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const date = req.nextUrl.searchParams.get("date");
  const startDate = req.nextUrl.searchParams.get("startDate");
  const endDate = req.nextUrl.searchParams.get("endDate");

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

  const hasInValidParam = [date, startDate, endDate].some((param) =>
    param ? isNaN(Date.parse(param)) : false
  );

  if (hasInValidParam)
    return NextResponse.json(
      {
        message: `${NEXT_SERVER_RESPONSE.BAD_REQUEST}_${mapMessageResponse(
          "query param is invalid"
        )}`,
        error: true,
        code: HttpStatusCode.BadRequest,
      },
      { status: HttpStatusCode.BadRequest }
    );

  try {
    const hasStartAndEnd = startDate && endDate;
    if (hasStartAndEnd && startDate !== endDate) {
      const expenses = await getExpenseDataService({
        userId: user?.userId,
        startDate,
        endDate,
      });

      if (expenses.length) {
        return NextResponse.json({
          message: mapMessageResponse("get expense success"),
          data: expenses,
        });
      }
    }

    if (hasStartAndEnd && startDate === endDate) {
      const expenses = await getExpenseDataService({
        userId: user?.userId,
        startDate: startDate,
      });

      if (expenses.length) {
        return NextResponse.json({
          message: mapMessageResponse("get expense success"),
          data: expenses,
        });
      }
    }

    const expenses = await getExpenseDataService({
      userId: user?.userId,
      startDate: date ?? undefined,
    });

    if (expenses.length) {
      return NextResponse.json({
        message: mapMessageResponse("get expense success"),
        data: expenses,
      });
    }

    return NextResponse.json({
      message: mapMessageResponse("expense not found"),
      data: EMPTY_ARRAY,
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
