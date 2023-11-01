import { EMPTY_STRING, DEFAULT_VALUE_NUMBER } from "@/constants";

export const toString = (value?: string | null) => value ?? EMPTY_STRING;

export const toNumber = (num?: number | null) => num ?? DEFAULT_VALUE_NUMBER;
