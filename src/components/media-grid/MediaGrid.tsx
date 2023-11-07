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
    !isStringEmpty(props.title) && !isStringEmpty(props.description);

  return (
    <section class="my-8">
      {showHeader && (
        <div class="flex justify-between mb-8">
          <div>
            <h1 class="text-3xl uppercase">{props.title}</h1>
            <p>{props.description}</p>
          </div>
          <p>Total results: {props.total}</p>
        </div>
      )}
      <div class="grid grid-cols-6 gap-4">
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
