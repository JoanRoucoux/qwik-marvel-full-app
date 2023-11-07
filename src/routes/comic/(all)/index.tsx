import { component$, useSignal } from '@builder.io/qwik';
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
  const currentPage = useSignal<number>(1);
  const collection = useSignal<Comic[]>(comics.value.data?.results || []);

  return (
    <MediaGrid
      title="Marvel Comics"
      description="Home of iconic characters and captivating storylines, inspiring fans for decades."
      collection={collection.value}
      currentPage={currentPage.value}
      pageCount={getTotalPages(comics.value.data?.total, 18)}
      total={comics.value.data?.total}
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
  title: 'Comics | Marvel',
  meta: [
    {
      name: 'description',
      content: 'Learn about your favorite Marvel comics!',
    },
  ],
};
