import dayjs from "dayjs";

const DEFAULT_FORMAT = "DD MMM YYYY";

export const formatDate = (date: Date, format?: string) =>
  dayjs(date).format(format || DEFAULT_FORMAT);
