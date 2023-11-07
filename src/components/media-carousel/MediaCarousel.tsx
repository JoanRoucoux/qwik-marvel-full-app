import { component$ } from '@builder.io/qwik';
import type { Media } from '~/services/types';
import { MediaCard } from '../media-card/MediaCard';

type Props = {
  collection: Media[];
  title: string;
  viewAllHref?: string;
};

export const MediaCarousel = component$((props: Props) => (
  <section class="mt-4">
    <div class="flex flex-row items-center justify-between">
      <h2 class="text-2xl uppercase">{props.title}</h2>
      {props.viewAllHref && (
        <a class="btn btn-primary" href={props.viewAllHref}>
          Explore All
        </a>
      )}
    </div>
    <div class="relative">
      <div class="overflow-y-auto py-6">
        <div class="carousel flex w-max flex-row gap-4">
          {props.collection?.map((media, index) => (
            <div key={`${media.id}-${index}`} class="carousel-item">
              <MediaCard media={media} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
));