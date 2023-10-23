export type ErrorContainerProps = {
  header?: string;
  description?: string;
  onClick?: <T>(arg?: T) => void;
  isDisabled?: boolean;
};
