import type { MediaType } from '~/services/types';

export const paths = {
  index: '/',
  notFound: '/404',
  characters: '/character',
  characterComics: (id: number) => `/character/${id}/comics`,
  comics: '/comic',
  search: '/search',
  media: (mediaType: MediaType, id: number) => `/${mediaType}/${id}`,
  github: 'https://github.com/JoanRoucoux/qwik-marvel-full-app',
};
