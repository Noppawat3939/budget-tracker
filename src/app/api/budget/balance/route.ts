import { NEXT_SERVER_RESPONSE } from "@/constants";
import { mapMessageResponse } from "@/helper";
import {
  getBudgetBalanceService,
  getBudgetService,
  getUserService,
} from "@/services";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const user = await getUserService(req);

  const budgetIdParam = req.nextUrl.searchParams.get("budgetId");

  if (!user)
    return NextResponse.json({
      error: true,
      code: HttpStatusCode.BadRequest,
      message: mapMessageResponse("user not found"),
    });

  try {
    const budgets = await getBudgetService({ userId: user.userId });
    const data = await getBudgetBalanceService({ userId: user.userId });

    if (budgetIdParam) {
      const foundBalanceByParam = data?.find(
        (item) => item?.budgetId === budgetIdParam
      );

      return NextResponse.json({
        message: `${NEXT_SERVER_RESPONSE.GET}_${mapMessageResponse(
          "balance by budget-id"
        )}`,
        data: foundBalanceByParam,
      });
    }

    if (budgets.length) {
      return NextResponse.json({
        message: `${NEXT_SERVER_RESPONSE.GET}_${mapMessageResponse("balance")}`,
        data,
      });
    }

    return NextResponse.json({
      message: `${NEXT_SERVER_RESPONSE.GET}_${mapMessageResponse("balance")}`,
      data: [],
    });
  } catch (error) {
    return NextResponse.json({
      message: `${NEXT_SERVER_RESPONSE.SERVER_ERROR}_${mapMessageResponse(
        "get balance"
      )}`,
    });
  }
};
