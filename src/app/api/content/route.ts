import { NextResponse } from "next/server";

import { getContentService } from "@/services";
import { NEXT_SERVER_RESPONSE } from "@/constants";
import { HttpStatusCode } from "axios";
import { mapMessageResponse } from "@/helper";

export const GET = async (req: Request) => {
  if (!req)
    return NextResponse.json(
      {
        message: mapMessageResponse("Request params is required"),
        error: true,
        code: HttpStatusCode.BadRequest,
      },
      { status: HttpStatusCode.BadRequest }
    );

  try {
    if (req) {
      const content = getContentService(req);

      return NextResponse.json(JSON.stringify({ form: content }));
    }

    return NextResponse.json({
      message: mapMessageResponse("content not found"),
    });
  } catch (error) {
    console.log(`${NEXT_SERVER_RESPONSE.SERVER_ERROR}_get_content`, error);

    return NextResponse.json(
      {
        message: `${NEXT_SERVER_RESPONSE.SERVER_ERROR}_${mapMessageResponse(
          `can't get content from server`
        )}`,
        error: true,
        code: HttpStatusCode.InternalServerError,
      },
      { status: HttpStatusCode.InternalServerError }
    );
  }
};
