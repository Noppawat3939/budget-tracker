import { NEXT_SERVER_RESPONSE } from "@/constants";
import { mapMessageResponse } from "@/helper";
import {
  deleteExpenseService,
  deleteIncomeService,
  getExpenseByIdService,
  getIncomeByIdService,
  getUserService,
} from "@/services";
import { HttpStatusCode } from "axios";
import { isEmpty } from "lodash";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  const user = await getUserService(req);

  const incomeId = req.nextUrl.searchParams.get("incomeId");
  const expenseId = req.nextUrl.searchParams.get("expenseId");

  const searchParamNotMatched = [incomeId, expenseId].every((id) =>
    isEmpty(id)
  );

  if (!user)
    return NextResponse.json(
      {
        message: mapMessageResponse("user not found"),
        error: true,
        code: HttpStatusCode.BadRequest,
      },
      { status: HttpStatusCode.BadRequest }
    );

  if (searchParamNotMatched)
    return NextResponse.json(
      {
        message: mapMessageResponse("id for delete is required"),
        code: HttpStatusCode.BadRequest,
        error: true,
      },
      { status: HttpStatusCode.BadRequest }
    );

  try {
    if (incomeId) {
      const income = await getIncomeByIdService(incomeId);

      if (!isEmpty(income)) {
        await deleteIncomeService(incomeId);

        return NextResponse.json({
          message: mapMessageResponse("delete income success"),
        });
      } else {
        return NextResponse.json({
          message: mapMessageResponse("income id not found"),
        });
      }
    }

    if (expenseId) {
      const expense = await getExpenseByIdService(expenseId);

      if (!isEmpty(expense)) {
        await deleteExpenseService(expenseId);

        return NextResponse.json({
          message: mapMessageResponse("delete expense success"),
        });
      } else {
        return NextResponse.json({
          message: mapMessageResponse("expense id not found"),
        });
      }
    }
  } catch (error) {
    console.log(
      `🚀 ===> ${NEXT_SERVER_RESPONSE.SERVER_ERROR}_delete_budget`,
      error
    );

    return NextResponse.json(
      {
        message: `${NEXT_SERVER_RESPONSE.SERVER_ERROR}_${mapMessageResponse(
          "delete budget"
        )}`,
      },
      { status: HttpStatusCode.InternalServerError }
    );
  }
};
