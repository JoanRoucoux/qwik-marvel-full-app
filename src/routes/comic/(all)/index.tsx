import { $, component$, useSignal } from '@builder.io/qwik';
import {
  routeLoader$,
  server$,
  type DocumentHead,
} from '@builder.io/qwik-city';
import { getComics, getMarvelContext } from '~/services/marvel';
import type { Comic } from '~/services/types';
import { getTotalPages } from '~/utils/format';
import { MediaGrid } from '~/components';

export const useComicsLoader = routeLoader$(async (event) => {
  const context = getMarvelContext(event);
  return await getComics({ context, page: 1, limit: 18 });
});

export const getMore = server$(async function (page: number) {
  const context = getMarvelContext(this);
  return await getComics({ context, page, limit: 18 });
});

export default component$(() => {
  const comics = useComicsLoader();
  const { total, results } = comics.value.data || {};

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
      title="Marvel Comics"
      description="Home of iconic characters and captivating storylines, inspiring fans for decades."
      collection={collection.value}
      currentPage={currentPage.value}
      pageCount={getTotalPages(total, 18)}
      total={total}
      onMore$={handleMore}
    />
  );
});

export const head: DocumentHead = {
  title: 'Marvel Comics | Qwik City Marvel',
  meta: [
    {
      name: 'description',
      content: 'Learn about your favorite Marvel Comics!',
    },
  ],
};
