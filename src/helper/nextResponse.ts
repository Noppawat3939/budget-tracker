//* utils for service API

import { isUndefined } from "lodash";
import { NextResponse } from "next/server";

export const mapMessageResponse = (message: string) => {
  const newTextResponse = message.replaceAll(" ", "_").toUpperCase();

  return newTextResponse;
};
