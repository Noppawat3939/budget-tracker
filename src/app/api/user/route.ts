import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    return NextResponse.json({ message: "User" });
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
};
