import { REGEX } from "@/constants";

export const priceFormatter = (num: number) =>
  new Intl.NumberFormat("th", {
    style: "currency",
    currency: "THB",
  }).format(num);

export const numberFormatter = (num: number) =>
  Intl.NumberFormat("th").format(num);

export const onlyNumber = (str: string) => str.replace(REGEX.NUMBER_FORMAT, "");

export const cleanUpFirstCharacter = (str: string) =>
  onlyNumber(str)?.[0] === "0"
    ? `${onlyNumber(str)?.slice(1)}`
    : onlyNumber(str);
