import {
  HiIdentificationSolid,
  HiDocumentMagnifyingGlassSolid,
  HiDocumentTextSolid,
  HiShoppingCartSolid,
  HiBookmarkSolid,
} from '@qwikest/icons/heroicons';
import type { Url } from '~/services/types';
import { Matcher } from '~/utils/matcher';

export const links = (urls: Url[]) =>
  urls
    .map((item) =>
      Matcher()
        .on(
          () => item?.type === 'detail',
          () => ({
            ...item,
            name: 'Detail',
            icon: HiIdentificationSolid,
          })
        )
        .on(
          () => item?.type === 'wiki',
          () => ({
            ...item,
            name: 'Wiki',
            icon: HiDocumentMagnifyingGlassSolid,
          })
        )
        .on(
          () => item?.type === 'comiclink',
          () => ({
            ...item,
            name: 'Comic link',
            icon: HiDocumentTextSolid,
          })
        )
        .on(
          () => item?.type === 'purchase',
          () => ({
            ...item,
            name: 'Purchase',
            icon: HiShoppingCartSolid,
          })
        )
        .on(
          () => item?.type === 'reader',
          () => ({
            ...item,
            name: 'Reader',
            icon: HiBookmarkSolid,
          })
        )
        .otherwise(() => {})
    )
    .map((item) => ({
      ...item,
      path: item?.url,
    }));
