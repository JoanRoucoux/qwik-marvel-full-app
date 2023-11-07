import { component$ } from '@builder.io/qwik';
import { getYear } from '~/utils/format';

export const Footer = component$(() => (
  <footer class="footer footer-center p-4">
    <aside>
      <p>Data provided by Marvel. © {getYear()} Marvel</p>
    </aside>
  </footer>
));
