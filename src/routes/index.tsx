import { component$ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import {
  getCharacters,
  getComics,
  getMarvelContext,
  getRandomMedia,
} from '~/services/marvel';
import type { Character, Comic } from '~/services/types';
import { paths } from '~/utils/paths';
import { CharacterHero, ComicHero, MediaCarousel } from '~/components';

export const useContentLoader = routeLoader$(async (event) => {
  const context = getMarvelContext(event);

  try {
    const [characters, comics] = await Promise.all([
      getCharacters({ context, page: 1, limit: 15 }),
      getComics({ context, page: 1, limit: 15, dateDescriptor: 'thisMonth' }),
    ]);

    const random = getRandomMedia<Character | Comic>({
      collections: [characters, comics],
    });

    return { characters, comics, random };
  } catch {
    throw event.redirect(302, paths.notFound);
  }
});

export default component$(() => {
  const resource = useContentLoader();
  const { characters, comics, random } = resource.value;

  return (
    <>
      {(random.mediaType === 'character' && (
        <CharacterHero media={random as Character} clickable />
      )) ||
        (random.mediaType === 'comic' && (
          <ComicHero media={random as Comic} clickable />
        ))}
      <MediaCarousel
        collection={characters.data?.results || []}
        title="Discover new characters"
        viewAllHref={paths.characters}
      />
      <MediaCarousel
        collection={comics.data?.results || []}
        title="New comics this month"
        viewAllHref={paths.comics}
      />
    </>
  );
});

export const head: DocumentHead = {
  title: 'Qwik City Marvel',
  meta: [
    {
      name: 'description',
      content:
        'An interactive app to explore Marvel superheroes and their stories.',
    },
  ],
};
