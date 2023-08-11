import { NextResponse } from "next/server";

import { getFormContent } from "@/services";

export const GET = async () => {
  try {
    const form = getFormContent("createBudgetForm");

    return NextResponse.json(JSON.stringify({ form }));
  } catch (error) {
    console.log("error post", error);

    return new NextResponse("Server error", { status: 500 });
  }
};
