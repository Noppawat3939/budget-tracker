import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    //TODO: get user from firebase
    return NextResponse.json({ message: "User" });
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
};
