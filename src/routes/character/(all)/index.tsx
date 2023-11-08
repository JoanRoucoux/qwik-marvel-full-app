import { $, component$, useSignal } from '@builder.io/qwik';
import {
  routeLoader$,
  server$,
  type DocumentHead,
} from '@builder.io/qwik-city';
import { getCharacters, getMarvelContext } from '~/services/marvel';
import type { Character } from '~/services/types';
import { getTotalPages } from '~/utils/format';
import { MediaGrid } from '~/components';

export const useCharactersLoader = routeLoader$(async (event) => {
  const context = getMarvelContext(event);
  return await getCharacters({ context, page: 1, limit: 18 });
});

export const getMore = server$(async function (page: number) {
  const context = getMarvelContext(this);
  return await getCharacters({ context, page, limit: 18 });
});

export default component$(() => {
  const characters = useCharactersLoader();
  const { total, results } = characters.value.data || {};

  const currentPage = useSignal<number>(1);
  const collection = useSignal<Character[]>(results || []);

  const handleMore = $(async () => {
    const newData = await getMore(currentPage.value + 1);
    const newMedia = newData.data?.results || [];
    collection.value = [...collection.value, ...newMedia];
    currentPage.value += 1;
  });

  return (
    <MediaGrid
      title="Marvel Characters"
      description="Diverse and beloved with unique abilities, compelling backstories, and
          unforgettable personalities."
      collection={collection.value}
      currentPage={currentPage.value}
      pageCount={getTotalPages(total, 18)}
      total={total}
      onMore$={handleMore}
    />
  );
});

export const head: DocumentHead = {
  title: 'Marvel Characters, Super Heroes, &amp; Villains | Qwik City Marvel',
  meta: [
    {
      name: 'description',
      content:
        'Learn about your favorite Marvel characters, super heroes, &amp; villains!',
    },
  ],
};
