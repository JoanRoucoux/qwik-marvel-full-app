import { component$ } from '@builder.io/qwik';
import { DocumentHead, routeLoader$, z } from '@builder.io/qwik-city';
import { HiCurrencyDollarSolid } from '@qwikest/icons/heroicons';
import {
  getComic,
  getComicCharacters,
  getMarvelContext,
} from '~/services/marvel';
import type { Character, Comic } from '~/services/types';
import { isArrayEmpty } from '~/utils/array';
import { formatCurrency } from '~/utils/format';
import { paths } from '~/utils/paths';
import { isStringEmpty } from '~/utils/string';
import { ComicHero, ExternalLinks, MediaCarousel } from '~/components';

export const useContentLoader = routeLoader$(async (event) => {
  const parseResult = await z
    .object({ comicId: z.coerce.number().min(0).step(1) })
    .safeParseAsync(event.params);

  if (!parseResult.success) {
    throw event.redirect(302, paths.notFound);
  }

  const context = getMarvelContext(event);

  try {
    const [comic, characters] = await Promise.all([
      getComic({
        context,
        id: parseResult.data.comicId,
      }),
      getComicCharacters({
        context,
        id: parseResult.data.comicId,
      }),
    ]);
    return { comic, characters };
  } catch {
    throw event.redirect(302, paths.notFound);
  }
});

export default component$(() => {
  const resource = useContentLoader();

  const comic = resource.value.comic.data?.results?.[0];
  const comicPrice = comic?.prices?.find((item) => item.type === 'printPrice')
    ?.price;
  const comicCharacters = resource.value.characters.data?.results;

  return (
    <>
      <ComicHero media={comic as Comic} />
      <section class="mt-4">
        <div class="grid grid-cols-6 gap-4">
          <div class="bg-base-200 col-span-5 flex flex-col gap-4 p-4">
            <h2 class="text-3xl">Storyline</h2>
            <p>
              {!isStringEmpty(comic?.description)
                ? comic?.description
                : 'No description'}
            </p>
            <p>
              Creators:{' '}
              {comic?.creators?.items
                ?.map((item) => `${item.name} (${item.role})`)
                ?.join(', ')}
              .
            </p>
            <ExternalLinks urls={comic?.urls || []} />
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
      {!isArrayEmpty<Character>(comicCharacters) && (
        <MediaCarousel
          collection={comicCharacters as Character[]}
          title="Characters list"
        />
      )}
    </>
  );
});

export const head: DocumentHead = {
  title: 'Marvel Characters, Super Heroes, &amp; Villains List | Marvel',
  meta: [
    {
      name: 'description',
      content:
        'Learn about your favorite Marvel characters, super heroes, &amp; villains!' +
        ' Discover their powers, weaknesses, abilities, &amp; more!',
    },
  ],
};
