import { NextResponse } from "next/server";

import { getContentService } from "@/services";
import { NEXT_SERVER_RESPONSE } from "@/constants";

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
    console.log(`${NEXT_SERVER_RESPONSE.SERVER_ERROR}_get_content`, error);

    return new NextResponse(NEXT_SERVER_RESPONSE.SERVER_ERROR, { status: 500 });
  }
};
