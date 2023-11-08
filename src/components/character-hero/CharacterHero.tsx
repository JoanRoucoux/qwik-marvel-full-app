import { component$ } from '@builder.io/qwik';
import type { Character } from '~/services/types';
import { getThumbnail } from '~/utils/image';
import { paths } from '~/utils/paths';

type Props = {
  media: Character;
  clickable?: boolean;
};

export const CharacterHero = component$((props: Props) => (
  <section class="bg-base-200 mt-8">
    <div class="flex flex-col-reverse md:flex-row items-center">
      <div class="w-full md:w-1/2 p-8">
        <h1 class="mt-0 mb-4">{props.media.name}</h1>
        {props.media.description && (
          <p class="after:content-none	mb-0">{props.media.description}</p>
        )}
        {props.clickable && (
          <a
            href={paths.media('character', props.media.id)}
            class="btn btn-wide btn-primary mt-8"
          >
            See more
          </a>
        )}
      </div>
      <div class="w-full md:w-1/2 p-0 md:p-8">
        <img
          width={850}
          height={850}
          alt={props.media.name || ''}
          src={getThumbnail(props.media.thumbnail)}
          class="w-full h-auto m-0 object-cover object-top"
        />
      </div>
    </div>
  </section>
));
