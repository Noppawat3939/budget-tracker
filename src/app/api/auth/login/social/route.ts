import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  const body = await req.json();

  try {
    return NextResponse.json({ message: "Login with social" });
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
};
