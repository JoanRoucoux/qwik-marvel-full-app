import { $, component$, useSignal } from '@builder.io/qwik';
import { routeLoader$, server$, z } from '@builder.io/qwik-city';
import { getCharacterComics, getMarvelContext } from '~/services/marvel';
import type { Comic } from '~/services/types';
import { getTotalPages } from '~/utils/format';
import { paths } from '~/utils/paths';
import { MediaGrid } from '~/components';

export const useCharacterComicsLoader = routeLoader$(async (event) => {
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
  const { total, results } = characterComics.value.data || {};

  const currentPage = useSignal<number>(1);
  const collection = useSignal<Comic[]>(results || []);

  const handleMore = $(async () => {
    const newData = await getMore(currentPage.value + 1);
    const newMedia = newData.data?.results || [];
    collection.value = [...collection.value, ...newMedia];
    currentPage.value += 1;
  });

  return (
    <MediaGrid
      collection={collection.value}
      currentPage={currentPage.value}
      pageCount={getTotalPages(total, 18)}
      total={total}
      onMore$={handleMore}
    />
  );
});
