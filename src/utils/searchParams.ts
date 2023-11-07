import { isStringEmpty } from './string';

export const buildSearchParams = (
  query?: Record<string, unknown>
): URLSearchParams => {
  const entries = Object.entries(query || {});
  const pairs = entries.flatMap(([key, value]) =>
    !isStringEmpty(value) ? [[key, `${value}`]] : []
  );
  return new URLSearchParams(pairs);
};
