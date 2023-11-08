import { component$ } from '@builder.io/qwik';
import type { Character } from '~/services/types';
import { ExternalLinks } from '../external-links/ExternalLinks';
import { Stats } from '../stats/Stats';

type Props = {
  character: Character;
};

export const CharacterOverview = component$((props: Props) => (
  <section class="mt-4 bg-base-200 p-4">
    <div class="flex flex-col gap-4">
      <h2>Storyline</h2>
      <p>
        {props.character.description
          ? props.character.description
          : 'No description'}
      </p>
      <ExternalLinks urls={props.character.urls || []} />
      <Stats
        comics={props.character.comics}
        stories={props.character.stories}
        events={props.character.events}
        series={props.character.series}
      />
    </div>
  </section>
));
