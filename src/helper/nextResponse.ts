export const mapMessageResponse = (message: string) => {
  const cleaned = message.replaceAll(" ", "_").toUpperCase();

  return cleaned;
};
