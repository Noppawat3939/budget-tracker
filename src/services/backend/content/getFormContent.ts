import { contents } from "./contents";

type Content = keyof typeof contents;

export const getFormContent = (key: Content) => {
  return contents[key] ?? undefined;
};
