import { PATH } from "./path";

export const getPathNameService = (queryPath?: string) => {
  if (queryPath) {
    const queryPathResponse = PATH.filter((path) => path.name === queryPath);

    return queryPathResponse;
  }

  return PATH;
};
