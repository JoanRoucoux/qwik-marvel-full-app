import { component$ } from '@builder.io/qwik';
import { HiBars3Solid } from '@qwikest/icons/heroicons';
import { SiGithub } from '@qwikest/icons/simpleicons';
import { paths } from '~/utils/paths';
import { Logo } from '~/components';

export const Header = component$(() => (
  <div class="bg-base-200 flex h-16 w-full justify-center sticky top-0 lg:hidden">
    <div class="navbar w-full">
      <div class="navbar-start">
        <span
          class="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]"
          data-tip="Menu"
        >
          <label
            aria-label="Open menu"
            for="drawer"
            class="btn btn-ghost btn-square"
          >
            <HiBars3Solid class="h-6 w-6" />
          </label>
        </span>
      </div>
      <div class="navbar-center">
        <Logo />
      </div>
      <div class="navbar-end">
        <span
          class="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]"
          data-tip="GitHub"
        >
          <div class="flex-none items-center">
            <a
              aria-label="See Github repo"
              target="_blank"
              href={paths.github}
              rel="noopener, noreferrer"
              class="btn btn-ghost btn-square"
            >
              <SiGithub class="h-6 w-6" />
            </a>
          </div>
        </span>
      </div>
    </div>
  </div>
));
