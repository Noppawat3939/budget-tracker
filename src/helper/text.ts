import { EMPTY_STRING, FIRST_INDEX, SECOND_INDEX } from "@/constants";

export const toSubString = (text: string, length: number) => {
  return `${text.substring(FIRST_INDEX, length)}...`;
};

export const toCapitalize = (text: string) => {
  const cleaned = text?.replaceAll(" ", EMPTY_STRING);

  return `${cleaned?.at(FIRST_INDEX)?.toUpperCase()}${cleaned?.slice(
    SECOND_INDEX
  )}`;
};
