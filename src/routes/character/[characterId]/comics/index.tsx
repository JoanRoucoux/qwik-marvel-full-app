import { component$, useSignal } from '@builder.io/qwik';
import { DocumentHead, routeLoader$, server$, z } from '@builder.io/qwik-city';
import { getCharacterComics, getMarvelContext } from '~/services/marvel';
import type { Comic } from '~/services/types';
import { getTotalPages } from '~/utils/format';
import { paths } from '~/utils/paths';
import { MediaGrid } from '~/components';

const useCharacterComicsLoader = routeLoader$(async (event) => {
  const parseResult = await z
    .object({ characterId: z.coerce.number().min(0).step(1) })
    .safeParseAsync(event.params);

  if (!parseResult.success) {
    throw event.redirect(302, paths.notFound);
  }

  const context = getMarvelContext(event);

  try {
    return await getCharacterComics({
      context,
      id: parseResult.data.characterId,
      page: 1,
      limit: 18,
    });
  } catch {
    throw event.redirect(302, paths.notFound);
  }
});

const getMore = server$(async function (page: number) {
  const parseResult = await z
    .object({ characterId: z.coerce.number().min(0).step(1) })
    .parseAsync(this.params);

  const context = getMarvelContext(this);

  return await getCharacterComics({
    context,
    id: parseResult.characterId,
    page,
    limit: 18,
  });
});

export default component$(() => {
  const characterComics = useCharacterComicsLoader();
  const currentPage = useSignal<number>(1);
  const collection = useSignal<Comic[]>(
    characterComics.value.data?.results || []
  );

  return (
    <MediaGrid
      collection={collection.value}
      currentPage={currentPage.value}
      pageCount={getTotalPages(characterComics.value.data?.total, 18)}
      total={characterComics.value.data?.total}
      onMore$={async () => {
        const data = await getMore(currentPage.value + 1);
        const newMedia = data.data?.results || [];
        collection.value = [...collection.value, ...newMedia];
        currentPage.value += 1;
      }}
    />
  );
});

export const head: DocumentHead = {
  title: 'Character details | Marvel',
  meta: [
    {
      name: 'description',
      content: 'Learn about your Marvel character!',
    },
  ],
};
