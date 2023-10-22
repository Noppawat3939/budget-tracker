import { NEXT_SERVER_RESPONSE } from "@/constants";
import { mapMessageResponse } from "@/helper";
import { getUserService, updateExpense, updateIncome } from "@/services";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";
import type { UpdatedRequestBody } from "./type";
import { isEmpty } from "lodash";

export const PUT = async (req: NextRequest) => {
  const body: UpdatedRequestBody = await req.json();
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
    if (body.income) {
      const {
        income: { income, incomeId, description, value },
      } = body;

      const isEmptyIncomePayload = [income, description, value].every(isEmpty);

      if (!incomeId) {
        return NextResponse.json(
          {
            message: mapMessageResponse("income id is required"),
            error: true,
            code: HttpStatusCode.BadRequest,
          },
          { status: HttpStatusCode.BadRequest }
        );
      }

      if (isEmptyIncomePayload) {
        return NextResponse.json(
          {
            message: mapMessageResponse("payload for update income not found"),
            error: true,
            code: HttpStatusCode.BadRequest,
          },
          { status: HttpStatusCode.BadRequest }
        );
      }

      const updatedIncome = await updateIncome({
        incomeId,
        newIncome: {
          income,
          value,
          description,
        },
      });

      return NextResponse.json({
        message: mapMessageResponse("updated new income success"),
        data: updatedIncome,
      });
    }

    if (body.expense) {
      const {
        expense: { expenseId, expense, value, description },
      } = body;

      const isEmptyExpensePayload = [expense, description, value].every(
        isEmpty
      );

      if (!expenseId) {
        return NextResponse.json(
          {
            message: mapMessageResponse("expense id is required"),
            error: true,
            code: HttpStatusCode.BadRequest,
          },
          { status: HttpStatusCode.BadRequest }
        );
      }

      if (isEmptyExpensePayload) {
        return NextResponse.json(
          {
            message: mapMessageResponse("payload for update expense not found"),
            error: true,
            code: HttpStatusCode.BadRequest,
          },
          { status: HttpStatusCode.BadRequest }
        );
      }

      const updatedExpense = await updateExpense({
        expenseId,
        newExpense: { expense, value, description },
      });

      return NextResponse.json({
        message: mapMessageResponse("updated new expense success"),
        data: updatedExpense,
      });
    }
  } catch (error) {
    console.log(`${NEXT_SERVER_RESPONSE.SERVER_ERROR}_edit_budget`);

    return NextResponse.json(
      {
        message: `${NEXT_SERVER_RESPONSE.SERVER_ERROR}_${mapMessageResponse(
          "create budget"
        )}`,
        error: true,
      },
      { status: HttpStatusCode.InternalServerError }
    );
  }
};
