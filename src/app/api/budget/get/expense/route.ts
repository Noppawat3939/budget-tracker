import { NEXT_SERVER_RESPONSE } from "@/constants";
import { mapMessageResponse } from "@/helper";
import { getExpenseDataService, getUserService } from "@/services";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const user = await getUserService(req);

  if (!user)
    return NextResponse.json(
      {
        message: mapMessageResponse("user not found"),
        error: true,
        code: HttpStatusCode.BadRequest,
      },
      { status: HttpStatusCode.BadRequest }
    );

  try {
    const expenses = await getExpenseDataService(user?.userId);

    if (expenses.length) {
      const mapExpenses = expenses.flatMap((expense) => expense.expenses);

      return NextResponse.json({
        message: mapMessageResponse("get expense success"),
        data: mapExpenses,
      });
    }

    return NextResponse.json({
      message: mapMessageResponse("expense not found"),
      data: null,
    });
  } catch (error) {
    console.log(
      `🚀 ===> ${NEXT_SERVER_RESPONSE.SERVER_ERROR}_get_expense`,
      error
    );
    return NextResponse.json(
      {
        message: `${NEXT_SERVER_RESPONSE.SERVER_ERROR}_${mapMessageResponse(
          "get budget"
        )}`,
      },
      { status: HttpStatusCode.InternalServerError }
    );
  }
};
