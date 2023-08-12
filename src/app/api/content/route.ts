import { NextResponse } from "next/server";

import { getContentService } from "@/services";

export const GET = async (req: Request) => {
  if (!req)
    return new NextResponse("Request params is required", { status: 400 });

  try {
    if (req) {
      const content = getContentService(req);

      return NextResponse.json(JSON.stringify({ form: content }));
    }

    return NextResponse.json({ message: "content not found" });
  } catch (error) {
    console.log("error post", error);

    return new NextResponse("Server error", { status: 500 });
  }
};
