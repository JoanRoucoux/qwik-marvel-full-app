import { paths } from '~/utils/paths';

export const routes = (id: number) => [
  {
    name: 'Overview',
    path: paths.media('character', id),
  },
  {
    name: 'Comics',
    path: paths.characterComics(id),
  },
];
