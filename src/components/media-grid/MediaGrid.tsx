import { $, component$, QRL, useSignal } from '@builder.io/qwik';
import type { Media } from '~/services/types';
import { isStringEmpty } from '~/utils/string';
import { MediaCard } from '../media-card/MediaCard';

type Props = {
  title?: string;
  description?: string;
  collection: Media[];
  currentPage: number;
  pageCount: number;
  onMore$?: QRL<() => void>;
  total?: number;
};

export const MediaGrid = component$((props: Props) => {
  const isDisabled = useSignal<boolean>(false);

  const handleOnClick = $(() => {
    isDisabled.value = true;
    setTimeout(() => {
      isDisabled.value = false;
    }, 3000);
    props.onMore$?.();
  });

  const showHeader =
    !isStringEmpty(props.title) || !isStringEmpty(props.description);

  return (
    <section class="my-8">
      {showHeader && (
        <div class="flex flex-col gap-4 mb-8">
          <h1 class="text-3xl flex flex-col md:flex-row items-center gap-4">
            {props.title} <span class="badge badge-lg">{props.total}</span>
          </h1>
          {props.description && (
            <p class="text-center md:text-left">{props.description}</p>
          )}
        </div>
      )}
      <div class="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] justify-items-center gap-4">
        {props.collection?.map((media) => (
          <MediaCard key={`${media.id}`} media={media} />
        ))}
      </div>
      {props.currentPage < props.pageCount && (
        <div class="flex justify-center mt-4">
          <button
            type="button"
            class="btn btn-primary"
            onClick$={handleOnClick}
            disabled={isDisabled.value}
          >
            {isDisabled.value && <span class="loading loading-spinner"></span>}
            Show more
          </button>
        </div>
      )}
    </section>
  );
});
