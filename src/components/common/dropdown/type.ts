export type DropdownProps = {
  items: string[];
  disabled?: boolean;
  onSelected?: (selectedOption: string) => void;
};
