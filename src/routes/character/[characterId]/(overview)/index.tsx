import { component$ } from '@builder.io/qwik';
import { CharacterOverview } from '~/components';
import { useCharacterLoader } from '../layout';
import { Character } from '~/services/types';

export default component$(() => {
  const resource = useCharacterLoader();

  return (
    <CharacterOverview
      character={resource.value.data?.results?.[0] as Character}
    />
  );
});
