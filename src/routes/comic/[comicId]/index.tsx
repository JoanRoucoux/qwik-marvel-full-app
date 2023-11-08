import { component$ } from '@builder.io/qwik';
import { DocumentHead, routeLoader$, z } from '@builder.io/qwik-city';
import {
  getComic,
  getComicCharacters,
  getMarvelContext,
} from '~/services/marvel';
import type { Character, Comic } from '~/services/types';
import { isArrayEmpty } from '~/utils/array';
import { paths } from '~/utils/paths';
import { ComicHero, ComicOverview, MediaCarousel } from '~/components';

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
  const comicCharacters = resource.value.characters.data?.results;

  return (
    <>
      <ComicHero media={comic as Comic} />
      <ComicOverview comic={comic as Comic} />
      {!isArrayEmpty<Character>(comicCharacters) && (
        <MediaCarousel
          collection={comicCharacters as Character[]}
          title="Characters"
        />
      )}
    </>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const resource = resolveValue(useContentLoader);
  const { title } = resource.comic.data?.results?.[0] || {};

  return {
    title: `${title} | Qwik City Marvel`,
    meta: [
      {
        name: 'description',
        content: `Learn more about ${title}!`,
      },
    ],
  };
};
