import { component$ } from '@builder.io/qwik';
import type { ResourceList } from '~/services/types';
import { stats } from './Stats.utils';

type Props = {
  comics?: ResourceList;
  stories?: ResourceList;
  events?: ResourceList;
  series?: ResourceList;
};

export const Stats = component$((props: Props) => (
  <div class="grid grid-cols-2 gap-4 text-center">
    {stats({
      comics: props.comics,
      stories: props.stories,
      events: props.events,
      series: props.series,
    }).map((item, index) => (
      <div key={`${item.name}-${index}`} class="bg-base-100 px-4 py-2">
        <p class="text-2xl">{item.value}</p>
        <p>{item.name}</p>
      </div>
    ))}
  </div>
));
