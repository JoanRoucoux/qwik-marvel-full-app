import type { Media, MediaType } from '~/services/types';

export const getMediaType = (media: Media): MediaType => {
  if ('title' in media) {
    return 'comic';
  }
  return 'character';
};

export const getHeading = (media: Media): string | undefined => {
  if ('title' in media) {
    return media.title || '';
  }
  if ('name' in media) {
    return media.name || '';
  }
};
