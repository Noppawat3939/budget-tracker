import { NEXT_SERVER_REQUEST, NEXT_SERVER_RESPONSE } from "@/constants";
import { prismaDb } from "@/lib";
import { getHeadersToken, getUserService } from "@/services";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

type CreateBudgetRequest = {
  income: {
    income: string;
    description?: string;
    value: number;
  };
  // expense?: {
  //   expense: string;
  //   description?: string;
  //   value: number;
  // };
};

//TODO : handle create income only or expense only
export const POST = async (req: NextRequest) => {
  const { income } = (await req.json()) as CreateBudgetRequest;

  const token = getHeadersToken(
    req.headers.get(NEXT_SERVER_REQUEST.HEADERS.AUTH) || ""
  );

  const user = await getUserService(token?.email || "");

  if (!user)
    return NextResponse.json(
      { message: "User not found" },
      { status: HttpStatusCode.BadRequest }
    );

  if (!income?.income && !income?.value)
    return NextResponse.json(
      { message: "Income and value of incomes is required" },
      { status: HttpStatusCode.BadRequest }
    );

  try {
    const createBudget = await prismaDb.budget.create({
      data: {
        userId: user.userId,
        incomes: {
          create: {
            income: income?.income,
            value: income?.value,
            description: income?.description,
          },
        },
      },
      include: {
        incomes: true,
      },
    });

    const response = {
      budgetId: createBudget.budgetId,
      incomes: createBudget.incomes.map((income) => ({
        incomeId: income.incomeId,
        income: income.income,
        description: income.description,
        value: income.value,
      })),
    };

    return NextResponse.json(
      {
        message: `${NEXT_SERVER_RESPONSE.CREATED}_new_budget`,
        budget: response,
      },
      { status: HttpStatusCode.Created }
    );
  } catch (error) {
    console.log(
      `🚀 ===> ${NEXT_SERVER_RESPONSE.SERVER_ERROR}_create_budget`,
      error
    );
    return NextResponse.json(
      { message: `${NEXT_SERVER_RESPONSE.SERVER_ERROR}` },
      { status: HttpStatusCode.InternalServerError }
    );
  }
};
