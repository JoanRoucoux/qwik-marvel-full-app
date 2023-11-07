export const isStringEmpty = (candidate: string | unknown): boolean =>
  !candidate ||
  typeof candidate === 'undefined' ||
  typeof candidate !== 'string' ||
  candidate === '' ||
  candidate === 'null' ||
  candidate.length === 0 ||
  candidate.trim().length === 0 ||
  false;
