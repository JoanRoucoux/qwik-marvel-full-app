import { Slot, component$ } from '@builder.io/qwik';
import { DocumentHead, routeLoader$, z } from '@builder.io/qwik-city';
import { getCharacter, getMarvelContext } from '~/services/marvel';
import type { Character } from '~/services/types';
import { paths } from '~/utils/paths';
import { CharacterHero, CharacterSubheader } from '~/components';

export const useCharacterLoader = routeLoader$(async (event) => {
  const parseResult = await z
    .object({ characterId: z.coerce.number().min(0).step(1) })
    .safeParseAsync(event.params);

  if (!parseResult.success) {
    throw event.redirect(302, paths.notFound);
  }

  const context = getMarvelContext(event);

  try {
    return await getCharacter({
      context,
      id: parseResult.data.characterId,
    });
  } catch {
    throw event.redirect(302, paths.notFound);
  }
});

export default component$(() => {
  const resource = useCharacterLoader();

  return (
    <>
      <CharacterHero media={resource.value.data?.results?.[0] as Character} />
      <CharacterSubheader />
      <Slot />
    </>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const resource = resolveValue(useCharacterLoader);
  const { name } = resource.data?.results?.[0] || {};

  return {
    title: `${name} | Qwik City Marvel`,
    meta: [
      {
        name: 'description',
        content: `Learn more about ${name}!`,
      },
    ],
  };
};
