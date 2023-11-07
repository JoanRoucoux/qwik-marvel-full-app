import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { routes } from './CharacterSubheader.utils';

export const CharacterSubheader = component$(() => {
  const location = useLocation();

  return (
    <section class="bg-base-200 mt-4">
      <div class="flex flex-row items-center justify-center gap-4 p-4">
        {routes(+location.params.characterId).map((item, index) => (
          <a
            key={`${item.name}-${index}`}
            href={item.path}
            class="text-xl uppercase link link-hover"
          >
            {item.name}
          </a>
        ))}
      </div>
    </section>
  );
});
