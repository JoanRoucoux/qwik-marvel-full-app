import type { Image } from '~/services/types';

export const getThumbnail = (
  thumbnail: Image | undefined
): string | undefined => {
  if (!thumbnail) {
    return;
  }

  return `${thumbnail.path}.${thumbnail.extension}`;
};
