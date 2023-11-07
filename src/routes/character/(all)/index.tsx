import { component$, useSignal } from '@builder.io/qwik';
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
  const currentPage = useSignal<number>(1);
  const collection = useSignal<Character[]>(
    characters.value.data?.results || []
  );

  return (
    <MediaGrid
      title="Marvel Characters"
      description="Diverse and beloved with unique abilities, compelling backstories, and
          unforgettable personalities."
      collection={collection.value}
      currentPage={currentPage.value}
      pageCount={getTotalPages(characters.value.data?.total, 18)}
      total={characters.value.data?.total}
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
  title: 'Characters | Marvel',
  meta: [
    {
      name: 'description',
      content: 'Learn about your favorite Marvel characters!',
    },
  ],
};
