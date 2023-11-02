import dayjs from "dayjs";
type Dates = string | number | Date | dayjs.Dayjs | null | undefined;

const DEFAULT_FORMAT = "DD MMM YYYY";

export const formatDate = (date: Dates, format?: string) =>
  dayjs(date).format(format || DEFAULT_FORMAT);

export const getStartDateOfCurrentMonth = (format?: string) =>
  dayjs().startOf("month").format(format);

export const getStartDateOfPreviousMonth = (format?: string) =>
  dayjs().add(-1, "month").startOf("month").format(format);

export const getEndDateOfCurrentMonth = (format?: string) =>
  dayjs().endOf("month").format(format);

export const getEndDateOfPreviousMonth = (format?: string) =>
  dayjs().add(-1, "month").endOf("month").format(format);
