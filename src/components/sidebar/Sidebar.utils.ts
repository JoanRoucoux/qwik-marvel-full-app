import { paths } from '~/utils/paths';

export const routes = [
  {
    name: 'Home',
    path: paths.index,
  },
  {
    name: 'Characters',
    path: paths.characters,
  },
  {
    name: 'Comics',
    path: paths.comics,
  },
  {
    name: 'Search',
    path: paths.search,
  },
];

export const getHrefClass = (currentPath: string, path: string): string => {
  let hrefClass = 'uppercase';
  if (currentPath.replace(/\/+$/, '') === path) {
    hrefClass += ' active !bg-base-100';
  }
  return hrefClass;
};
