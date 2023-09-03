import { NEXT_SERVER_RESPONSE } from "@/constants";
import { mapMessageResponse } from "@/helper";
import {
  getBudgetByIdService,
  getBudgetService,
  getUserService,
} from "@/services";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

type QueryParam = "budgetId" | "incomeId" | "expenseId";

export const GET = async (req: NextRequest) => {
  const user = await getUserService(req);

  if (!user)
    return NextResponse.json({
      message: `${NEXT_SERVER_RESPONSE.BAD_REQUEST}_${mapMessageResponse(
        "user not found"
      )}`,
    });

  try {
    const queryParams = req.nextUrl.search.split("=");

    if (queryParams) {
      const [query, id] = queryParams;
      const _query = query.replaceAll("?", "") as QueryParam;

      if (_query === "budgetId") {
        const budgetByIdData = await getBudgetByIdService({
          budgetId: id,
          isExpenses: true,
          isIncome: true,
        });

        console.log("budgetByIdData", budgetByIdData);

        return NextResponse.json({
          message: `${NEXT_SERVER_RESPONSE.GET}`,
          data: budgetByIdData,
        });
      }
    }

    const budgetData = await getBudgetService({ userId: user.userId });

    const budgetDataResponse = budgetData?.map((data) => ({
      budgetId: data.budgetId,
      incomes: data.incomes.map((income) => ({
        incomeId: income.incomeId,
        income: income.income,
        value: income.value,
        description: income.description,
      })),
      expenses: data.expenses.map((expense) => ({
        expenseId: expense.expenseId,
        expense: expense.expense,
        value: expense.value,
        description: expense.description,
      })),
      total: { income: data?.incomes?.length, expense: data?.expenses?.length },
    }));

    return NextResponse.json({
      message: `${NEXT_SERVER_RESPONSE.GET}`,
      data: budgetDataResponse,
    });
  } catch (error) {
    console.log(
      `🚀 ===> ${NEXT_SERVER_RESPONSE.SERVER_ERROR}_get_budget`,
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
