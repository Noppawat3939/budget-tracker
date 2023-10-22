import { NEXT_SERVER_RESPONSE } from "@/constants";
import { mapMessageResponse } from "@/helper";
import { getIncomeDataService, getUserService } from "@/services";
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
    const incomes = await getIncomeDataService(user?.userId);

    if (incomes.length) {
      const mapIncomes = incomes.flatMap((income) => income.incomes);

      return NextResponse.json({
        message: mapMessageResponse("get income success"),
        data: mapIncomes,
      });
    }

    return NextResponse.json({
      message: mapMessageResponse("income not found"),
      data: null,
    });
  } catch (error) {
    console.log(
      `🚀 ===> ${NEXT_SERVER_RESPONSE.SERVER_ERROR}_get_income`,
      error
    );
    return NextResponse.json(
      {
        message: `${NEXT_SERVER_RESPONSE.SERVER_ERROR}_${mapMessageResponse(
          "get income"
        )}`,
      },
      { status: HttpStatusCode.InternalServerError }
    );
  }
};
