import {
  DEFAULT_VALUE_NUMBER,
  EMPTY_STRING,
  FIRST_INDEX,
  PERCENT,
  REGEX,
  SECOND_INDEX,
} from "@/constants";

export const priceFormatter = (num: number) =>
  new Intl.NumberFormat("th", {
    style: "currency",
    currency: "THB",
  }).format(num);

export const numberFormatter = (num: number) =>
  Intl.NumberFormat("th").format(num);

export const onlyNumber = (str: string) =>
  str.replace(REGEX.NUMBER_FORMAT, EMPTY_STRING);

export const cleanUpFirstCharacter = (str: string) =>
  onlyNumber(str)?.at(FIRST_INDEX) === "0"
    ? `${onlyNumber(str)?.slice(SECOND_INDEX)}`
    : onlyNumber(str);

export const toPercent = (
  value: number,
  totalValue: number,
  digits = DEFAULT_VALUE_NUMBER
) => {
  return `${((value / totalValue) * PERCENT).toFixed(digits)} %`;
};

export const toAverage = (numbers: number[], digits = 0) => {
  if (numbers.length) {
    const sum = numbers.reduce((prev, cur) => prev + cur, DEFAULT_VALUE_NUMBER);

    return Number((sum / numbers.length).toFixed(digits)) as number;
  }

  return DEFAULT_VALUE_NUMBER;
};
