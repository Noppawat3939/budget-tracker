import { NEXT_SERVER_RESPONSE } from "@/constants";
import { mapMessageResponse } from "@/helper";
import { getUserService } from "@/services";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  const user = await getUserService(req);

  if (!user)
    return NextResponse.json(
      {
        message: mapMessageResponse("user not found"),
        error: true,
        code: HttpStatusCode.BadRequest,
      },
      { status: HttpStatusCode.BadRequest }
    );

  try {
    return NextResponse.json({ message: "Edit budget" });
  } catch (error) {
    console.log(`${NEXT_SERVER_RESPONSE.SERVER_ERROR}_edit_budget`);

    return NextResponse.json(
      {
        message: `${NEXT_SERVER_RESPONSE.SERVER_ERROR}_${mapMessageResponse(
          "create budget"
        )}`,
      },
      { status: HttpStatusCode.InternalServerError }
    );
  }
};
