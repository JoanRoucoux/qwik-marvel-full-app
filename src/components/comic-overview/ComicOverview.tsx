import { component$ } from '@builder.io/qwik';
import { HiCurrencyDollarSolid } from '@qwikest/icons/heroicons';
import type { Comic, ResourceSummary } from '~/services/types';
import { isArrayEmpty } from '~/utils/array';
import { formatCurrency } from '~/utils/format';
import { isStringEmpty } from '~/utils/string';
import { ExternalLinks } from '../external-links/ExternalLinks';

type Props = {
  comic: Comic;
};

export const ComicOverview = component$((props: Props) => {
  const comicPrice = props.comic.prices?.find(
    (item) => item.type === 'printPrice'
  )?.price;

  return (
    <section class="mt-4">
      <div class="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div class="bg-base-200 md:col-span-5 flex flex-col gap-4 p-4">
          <h2>Storyline</h2>
          <p>
            {!isStringEmpty(props.comic.description)
              ? props.comic.description
              : 'No description'}
          </p>
          {!isArrayEmpty<ResourceSummary>(props.comic.creators?.items) && (
            <p>
              Creators:{' '}
              {props.comic.creators?.items
                ?.map((item) => `${item.name} (${item.role})`)
                ?.join(', ')}
              .
            </p>
          )}
          <ExternalLinks urls={props.comic.urls || []} />
        </div>
        <div class="bg-primary flex flex-col justify-evenly p-4">
          <HiCurrencyDollarSolid class="h-16 w-16" />
          <div>
            <p class="text-3xl">{formatCurrency(comicPrice)}</p>
            <p>Original price</p>
          </div>
        </div>
      </div>
    </section>
  );
});
