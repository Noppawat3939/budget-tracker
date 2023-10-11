export type SelectedProps = {
  options: { label: string; value: string }[];
  selectLabel?: string;
  defaultValue?: string;
  onValueChange: (value: string) => void;
  isShowFilterIcon?: boolean;
};
