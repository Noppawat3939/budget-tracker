import { NextRequest } from "next/server";

export const middleware = (req: NextRequest) => {
  console.log("middleware");
};
