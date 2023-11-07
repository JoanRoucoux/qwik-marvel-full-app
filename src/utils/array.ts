export const isArrayEmpty = <T>(array: T[] | null | undefined) =>
  !array || !Array.isArray(array) || array.length === 0;
