import { NEXT_SERVER_RESPONSE } from "@/constants";
import { mapBudgetData, mapMessageResponse } from "@/helper";
import {
  getBudgetByIdService,
  getBudgetBySearchService,
  getBudgetService,
  getUserService,
} from "@/services";
import { HttpStatusCode } from "axios";
import { isEmpty } from "lodash";
import { NextRequest, NextResponse } from "next/server";
import type { DirectionParam } from "./type";

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
    const queryParams = req.nextUrl.search;

    const querySearch = req.nextUrl.searchParams.get("search");

    if (queryParams) {
      const budgetIdParam = req.nextUrl.searchParams.get("budgetId");
      const directionParam = req.nextUrl.searchParams.get(
        "direction"
      ) as DirectionParam;

      if (budgetIdParam && !directionParam) {
        const budgetByIdData = await getBudgetByIdService({
          budgetId: budgetIdParam,
          isExpenses: true,
          isIncome: true,
        });

        if (isEmpty(budgetByIdData))
          return NextResponse.json({
            message: mapMessageResponse(`budget id is empty data`),
          });

        return NextResponse.json({
          message: `${NEXT_SERVER_RESPONSE.GET}`,
          data: budgetByIdData.map((data) => ({
            budgetId: data.budgetId,
            incomes: mapBudgetData({ incomes: data.incomes }),
            expenses: mapBudgetData({ expenses: data.expenses }),
            total: {
              income: data?.incomes?.length,
              expense: data?.expenses?.length,
            },
          })),
        });
      }

      if (budgetIdParam && directionParam === "income") {
        const budgetByIdData = await getBudgetByIdService({
          budgetId: budgetIdParam,
          isIncome: true,
        });

        return NextResponse.json({
          message: `${NEXT_SERVER_RESPONSE.GET}`,
          data: budgetByIdData.map((data) => ({
            budgetId: data.budgetId,
            incomes: mapBudgetData({ incomes: data.incomes }),
            total: {
              income: data?.incomes?.length,
            },
          })),
        });
      }

      if (budgetIdParam && directionParam === "expense") {
        const budgetByIdData = await getBudgetByIdService({
          budgetId: budgetIdParam,
          isExpenses: true,
        });

        return NextResponse.json({
          message: `${NEXT_SERVER_RESPONSE.GET}`,
          data: budgetByIdData.map((data) => ({
            budgetId: data.budgetId,
            expenses: mapBudgetData({ expenses: data.expenses }),
            total: {
              expense: data?.expenses?.length,
            },
          })),
        });
      }
    }

    if (querySearch) {
      const data = await getBudgetBySearchService(querySearch);

      return NextResponse.json({
        message:
          isEmpty(data.incomes) && isEmpty(data.expenses)
            ? mapMessageResponse("data not found")
            : mapMessageResponse("search budget success"),
        data,
      });
    }

    const budgetData = await getBudgetService({ userId: user.userId });

    const budgetDataResponse = budgetData?.map((data) => ({
      budgetId: data.budgetId,
      incomes: mapBudgetData({ incomes: data.incomes }),
      expenses: mapBudgetData({ expenses: data.expenses }),
      total: { income: data?.incomes?.length, expense: data?.expenses?.length },
      createdAt: data.createdAt,
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
