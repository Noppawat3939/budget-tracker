export const getUnique = <T>(value: T) =>
  Array.from(new Set(value as unknown[]));
