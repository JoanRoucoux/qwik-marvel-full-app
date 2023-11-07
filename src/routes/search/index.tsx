import { $, QwikChangeEvent, component$, useSignal } from '@builder.io/qwik';
import {
  routeLoader$,
  server$,
  type DocumentHead,
  useLocation,
} from '@builder.io/qwik-city';
import { HiMagnifyingGlassSolid } from '@qwikest/icons/heroicons';
import { getCharacters, getComics, getMarvelContext } from '~/services/marvel';
import type { Character, Comic } from '~/services/types';
import { isArrayEmpty } from '~/utils/array';
import { getTotalPages } from '~/utils/format';
import { MediaGrid } from '~/components';

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
    const data = await getMore({
      page: currentPage.value + 1,
      searchTerm: searchTerm.value,
      media: media.value,
    });
    const newMedia = data.data?.results || [];
    collection.value = [...collection.value, ...newMedia];
    currentPage.value += 1;
  });

  const options = [
    {
      name: 'Character',
      value: 'character',
    },
    {
      name: 'Comic',
      value: 'comic',
    },
  ];

  return (
    <>
      <section class="bg-base-200 mt-8">
        <div class="flex flex-col items-center gap-4 p-4">
          <h1 class="text-3xl uppercase">Explore</h1>
          <p>Search your favorite Marvel characters and comics!</p>
          <form class="flex justify-center items-center max-w-lg w-full gap-4">
            <input
              type="text"
              placeholder="Spider-Man, Thor, Avengers..."
              name="search"
              class="input w-full"
              bind:value={searchTerm}
              onChange$={handleSearchChange}
            />
            <select
              class="select w-fautoull"
              name="media"
              bind:value={media}
              onChange$={handleMediaChange}
            >
              {options?.map((item, index) => (
                <option
                  key={`${item.value}-${index}`}
                  value={item.value}
                  selected={item.value === media.value}
                >
                  {item.name}
                </option>
              ))}
            </select>
            <button type="submit" class="btn btn-primary">
              <HiMagnifyingGlassSolid class="h-6 w-6" />
            </button>
          </form>
        </div>
      </section>
      {!isArrayEmpty<Comic | Character>(resource.value?.data?.results) && (
        <MediaGrid
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
  title: 'Search | Marvel',
  meta: [
    {
      name: 'description',
      content: 'Search your favorite Marvel characters and comics!',
    },
  ],
};
