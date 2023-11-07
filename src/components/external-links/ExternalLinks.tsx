import { component$ } from '@builder.io/qwik';
import type { Url } from '~/services/types';
import { links } from './ExternalLinks.utils';

type Props = {
  urls: Url[];
};

export const ExternalLinks = component$((props: Props) => (
  <ul class="flex flex-row gap-4">
    {links(props.urls)?.map((item, index) => (
      <li key={`${item?.name}-${index}`}>
        <span
          class="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]"
          data-tip={item?.name}
        >
          <a href={item?.path} rel="noopener" target="_blank">
            {item?.icon?.()}
          </a>
        </span>
      </li>
    ))}
  </ul>
));
