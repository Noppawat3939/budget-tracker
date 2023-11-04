import dayjs from "dayjs";
type Dates = string | number | Date | dayjs.Dayjs | null | undefined;

const DEFAULT_FORMAT = "DD MMM YYYY";

export const formatDate = (date: Dates, format?: string) =>
  dayjs(date).format(format || DEFAULT_FORMAT);

export const getPrevMonth = () => dayjs().add(-1, "month");

export const getFirstDateOfMonth = (
  date?: string | number | Date | dayjs.Dayjs | null,
  format?: string
) => dayjs(date).startOf("month").format(format);

export const getLastDateOfMonth = (
  date?: string | number | Date | dayjs.Dayjs | null,
  format?: string
) => dayjs(date).endOf("month").format(format);
