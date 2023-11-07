import type { ResourceList } from '~/services/types';

type StatsArgs = {
  comics?: ResourceList;
  stories?: ResourceList;
  events?: ResourceList;
  series?: ResourceList;
};

export const stats = ({ comics, stories, events, series }: StatsArgs) => [
  {
    name: 'Comics',
    value: comics?.available || 0,
  },
  {
    name: 'Stories',
    value: stories?.available || 0,
  },
  {
    name: 'Events',
    value: events?.available || 0,
  },
  {
    name: 'Series',
    value: series?.available || 0,
  },
];
