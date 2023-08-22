export const toSubString = (text: string, length: number) => {
  return `${text.substring(0, length)}...`;
};

export const toCapitalize = (text: string) => {
  const cleaned = text?.replaceAll(" ", "");

  return `${cleaned?.at(0)?.toUpperCase()}${cleaned?.slice(1)}`;
};
