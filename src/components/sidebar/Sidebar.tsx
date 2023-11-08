import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { SiGithub } from '@qwikest/icons/simpleicons';
import { Logo } from '~/components';
import { paths } from '~/utils/paths';
import { getHrefClass, routes } from './Sidebar.utils';

export const Sidebar = component$(() => {
  const location = useLocation();

  return (
    <div class="drawer-side">
      <label for="drawer" class="drawer-overlay"></label>
      <aside class="bg-base-200 w-80 min-h-full flex flex-col justify-between">
        <div>
          <div class="bg-base-200 hidden items-center px-4 py-6 lg:flex justify-center sticky top-0">
            <Logo />
          </div>
          <ul class="menu menu-lg p-0 font-bold">
            {routes.map((route, index) => (
              <li key={index}>
                <a
                  href={route.path}
                  class={getHrefClass(location.url.pathname, route.path)}
                >
                  {route.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div class="p-4 invisible lg:visible">
          <a
            aria-label="Github"
            target="_blank"
            href={paths.github}
            rel="noopener, noreferrer"
            class="btn btn-ghost btn-square w-full"
          >
            <SiGithub class="h-6 w-6" />
          </a>
        </div>
      </aside>
    </div>
  );
});
