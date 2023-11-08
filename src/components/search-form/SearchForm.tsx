import { QRL, QwikChangeEvent, component$ } from '@builder.io/qwik';
import { HiMagnifyingGlassSolid } from '@qwikest/icons/heroicons';
import { mediaOptions } from './SearchForm.utils';

type Props = {
  searchTerm: string;
  media: string;
  onSearchChange: QRL<(event: QwikChangeEvent<HTMLInputElement>) => void>;
  onMediaChange: QRL<(event: QwikChangeEvent<HTMLSelectElement>) => void>;
};

export const SearchForm = component$((props: Props) => (
  <section class="bg-base-200 mt-8">
    <div class="flex flex-col items-center gap-4 p-8">
      <h1 class="text-3xl uppercase">Explore</h1>
      <p>Search your favorite Marvel characters and comics!</p>
      <form class="flex flex-col md:flex-row justify-center items-center max-w-lg w-full gap-4">
        <input
          type="text"
          placeholder="Spider-Man, Thor, Avengers..."
          name="search"
          class="input w-full md:w-3/6"
          value={props.searchTerm}
          onChange$={props.onSearchChange}
        />
        <select
          class="select w-full md:w-2/6"
          name="media"
          value={props.media}
          onChange$={props.onMediaChange}
        >
          {mediaOptions?.map((item, index) => (
            <option
              key={`${item.value}-${index}`}
              value={item.value}
              selected={item.value === props.media}
            >
              {item.name}
            </option>
          ))}
        </select>
        <button type="submit" class="btn btn-primary w-full md:w-1/6">
          <HiMagnifyingGlassSolid class="h-6 w-6" />
        </button>
      </form>
    </div>
  </section>
));
