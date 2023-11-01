import dayjs from "dayjs";
type Dates = string | number | Date | dayjs.Dayjs | null | undefined;

const DEFAULT_FORMAT = "DD MMM YYYY";

export const formatDate = (date: Dates, format?: string) =>
  dayjs(date).format(format || DEFAULT_FORMAT);
