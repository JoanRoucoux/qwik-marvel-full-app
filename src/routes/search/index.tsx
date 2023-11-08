import { $, QwikChangeEvent, component$, useSignal } from '@builder.io/qwik';
import {
  routeLoader$,
  server$,
  type DocumentHead,
  useLocation,
} from '@builder.io/qwik-city';
import { getCharacters, getComics, getMarvelContext } from '~/services/marvel';
import type { Character, Comic } from '~/services/types';
import { isArrayEmpty } from '~/utils/array';
import { getTotalPages } from '~/utils/format';
import { MediaGrid, SearchForm } from '~/components';

export const useSearchLoader = routeLoader$(async (event) => {
  const searchTerm = event.url.searchParams.get('search');
  const media = event.url.searchParams.get('media');

  if (!searchTerm) {
    return null;
  }

  const params = {
    context: getMarvelContext(event),
    page: 1,
    limit: 18,
    startsWith: searchTerm,
  };

  return media === 'character'
    ? await getCharacters(params)
    : await getComics(params);
});

type GetMoreArgs = {
  page: number;
  searchTerm: string;
  media: string;
};

export const getMore = server$(async function (props: GetMoreArgs) {
  const params = {
    context: getMarvelContext(this),
    limit: 18,
    ...props,
  };

  return props.media === 'character'
    ? await getCharacters(params)
    : await getComics(params);
});

export default component$(() => {
  const location = useLocation();

  const resource = useSearchLoader();

  const currentPage = useSignal<number>(1);
  const collection = useSignal<(Comic | Character)[]>(
    resource.value?.data?.results || []
  );

  const searchTerm = useSignal<string>(
    location.url.searchParams.get('search') || ''
  );
  const media = useSignal<string>(
    location.url.searchParams.get('media') || 'character'
  );

  const handleSearchChange = $((event: QwikChangeEvent<HTMLInputElement>) => {
    searchTerm.value = event.target.value;
  });

  const handleMediaChange = $((event: QwikChangeEvent<HTMLSelectElement>) => {
    media.value = event.target.value;
  });

  const handleMore = $(async () => {
    const newData = await getMore({
      page: currentPage.value + 1,
      searchTerm: searchTerm.value,
      media: media.value,
    });
    const newMedia = newData.data?.results || [];
    collection.value = [...collection.value, ...newMedia];
    currentPage.value += 1;
  });

  return (
    <>
      <SearchForm
        media={media.value}
        searchTerm={searchTerm.value}
        onMediaChange={handleMediaChange}
        onSearchChange={handleSearchChange}
      />
      {!isArrayEmpty<Comic | Character>(resource.value?.data?.results) && (
        <MediaGrid
          title="Results"
          collection={collection.value}
          currentPage={currentPage.value}
          pageCount={getTotalPages(resource.value?.data?.total, 18)}
          total={resource.value?.data?.total}
          onMore$={handleMore}
        />
      )}
    </>
  );
});

export const head: DocumentHead = {
  title: 'Search | Qwik City Marvel',
  meta: [
    {
      name: 'description',
      content: 'Search for your favorite Marvel characters and comics!',
    },
  ],
};
