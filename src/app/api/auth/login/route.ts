import { NextResponse } from "next/server";

export const POST = async () => {
  console.log(process.env.NEXT_FIREBASE_API_KEY);
  try {
    return NextResponse.json({ message: "Hello" });
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
};
