import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import { ExternalLinks, Stats } from '~/components';
import { useCharacterLoader } from '../layout';

export default component$(() => {
  const resource = useCharacterLoader();

  return (
    <section class="mt-4 bg-base-200 p-4">
      <div class="flex flex-col gap-4">
        <h2 class="text-3xl">Storyline</h2>
        <p>
          {resource.value.data?.results?.[0].description
            ? resource.value.data?.results?.[0].description
            : 'No description'}
        </p>
        <ExternalLinks urls={resource.value.data?.results?.[0].urls || []} />
        <Stats
          comics={resource.value.data?.results?.[0].comics}
          stories={resource.value.data?.results?.[0].stories}
          events={resource.value.data?.results?.[0].events}
          series={resource.value.data?.results?.[0].series}
        />
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: 'Character details | Marvel',
  meta: [
    {
      name: 'description',
      content: 'Learn about your Marvel character!',
    },
  ],
};
