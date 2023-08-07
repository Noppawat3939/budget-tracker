import { REGEX } from "@/constants";

export const priceFormatter = (num: number) =>
  new Intl.NumberFormat("th", {
    style: "currency",
    currency: "THB",
  }).format(num);

export const onlyNumber = (str: string) => str.replace(REGEX.NUMBER_FORMAT, "");
