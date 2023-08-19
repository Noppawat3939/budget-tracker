import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.json();

  console.log("body ==>", body);

  try {
    return NextResponse.json({ message: "Create User" });
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
};
