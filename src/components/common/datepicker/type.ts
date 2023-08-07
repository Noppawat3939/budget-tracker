import { type SelectSingleEventHandler } from "react-day-picker";

export type DatePickerProps = {
  placeholder?: string;
  value?: Date;
  onSelect?: SelectSingleEventHandler;
};
