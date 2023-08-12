import { contents } from "./contents";

export const getContentService = (req: Request) => {
  const [_, params] = req.url.split("?");

  const [search, value] = params.split("=");

  //@ts-ignore
  return contents[search][value] ?? undefined;
};
