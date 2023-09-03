import { NEXT_SERVER_RESPONSE } from "@/constants";
import {
  createBudgetService,
  createExpenseService,
  createIncomeService,
  getUserService,
} from "@/services";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { CreateBudgetRequest } from "@/types";
import { mapBudgetData, mapMessageResponse } from "@/helper";
import { SearchParams } from "./type";

export const POST = async (req: NextRequest) => {
  const { budgetId, income, expense } =
    (await req.json()) as CreateBudgetRequest;

  const user = await getUserService(req);

  if (!user)
    return NextResponse.json(
      { message: mapMessageResponse("user not found") },
      { status: HttpStatusCode.BadRequest }
    );

  try {
    const searchParams = req.nextUrl.search?.split("?=")?.at(1) as SearchParams;

    if (searchParams) {
      if (!budgetId)
        return NextResponse.json(
          {
            message: `${NEXT_SERVER_RESPONSE.BAD_REQUEST}_${mapMessageResponse(
              "budget id is required"
            )}`,
          },
          { status: HttpStatusCode.BadRequest }
        );

      if (searchParams === "income" && income) {
        const createIncome = await createIncomeService({
          budgetId: budgetId,
          income: income?.income,
          value: income?.value,
          description: income?.description,
        });

        const incomeResponse = {
          incomeId: createIncome.incomeId,
          income: createIncome.income,
          value: createIncome.value,
          description: createIncome.description,
        };

        return NextResponse.json(
          {
            message: `${NEXT_SERVER_RESPONSE.CREATED}`,
            incomeResponse,
          },
          { status: HttpStatusCode.Created }
        );
      }

      if (searchParams === "expense" && expense) {
        const createExpense = await createExpenseService({
          budgetId: budgetId,
          expense: expense?.expense,
          value: expense?.value,
          description: expense?.description,
        });

        const expenseResponse = {
          expenseId: createExpense.expenseId,
          expense: createExpense.expense,
          value: createExpense.value,
          description: createExpense.description,
        };

        return NextResponse.json(
          {
            message: `${NEXT_SERVER_RESPONSE.CREATED}`,
            expenseResponse,
          },
          { status: HttpStatusCode.Created }
        );
      }

      return NextResponse.json(
        {
          message: `${NEXT_SERVER_RESPONSE.BAD_REQUEST}_${
            searchParams === "income"
              ? mapMessageResponse("income data not found")
              : mapMessageResponse("expense data not found")
          }`,
        },
        { status: HttpStatusCode.BadRequest }
      );
    }

    if (income && expense) {
      const createBudget = await createBudgetService({
        userId: user.userId,
        incomes: {
          income: income.income,
          value: income.value,
          description: income.description,
        },
        expenses: {
          expense: expense.expense,
          value: expense.value,
          description: expense.description,
        },
      });

      const newBudgetResponse = {
        budgetId: createBudget.budgetId,
        incomes: mapBudgetData({ incomes: createBudget.incomes }),
        expenses: mapBudgetData({ expenses: createBudget.expenses }),
      };

      return NextResponse.json(
        {
          message: `${NEXT_SERVER_RESPONSE.CREATED}`,
          budget: newBudgetResponse,
        },
        { status: HttpStatusCode.Created }
      );
    }
  } catch (error) {
    console.log(
      `🚀 ===> ${NEXT_SERVER_RESPONSE.SERVER_ERROR}_create_budget`,
      error
    );
    return NextResponse.json(
      {
        message: `${NEXT_SERVER_RESPONSE.SERVER_ERROR}_${mapMessageResponse(
          "create budget"
        )}`,
      },
      { status: HttpStatusCode.InternalServerError }
    );
  }
};
