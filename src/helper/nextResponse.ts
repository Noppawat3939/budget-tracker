//* utils for service API
export const mapMessageResponse = (message: string) => {
  const newTextResponse = message.replaceAll(" ", "_").toUpperCase();

  return newTextResponse;
};
