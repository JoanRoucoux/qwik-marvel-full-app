import { Slot, component$ } from '@builder.io/qwik';
import { Footer, Header, Sidebar } from '~/components';

export default component$(() => (
  <div class="bg-base-300 drawer lg:drawer-open h-full">
    <input id="drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content overflow-x-hidden">
      <Header />
      <main class="max-w-[100vw] px-8">
        <Slot />
      </main>
      <Footer />
    </div>
    <Sidebar />
  </div>
));
