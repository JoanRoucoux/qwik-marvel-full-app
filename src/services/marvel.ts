import { RequestEventBase } from '@builder.io/qwik-city';
import { Md5 } from 'ts-md5';
import { buildSearchParams } from '~/utils/searchParams';
import { getOffset } from '~/utils/format';
import type { DataWrapper, Character, Comic } from './types';

export const getMarvelContext = (event: RequestEventBase) => {
  const baseURL = event.env.get('VITE_MARVEL_PUBLIC_BASE_URL');
  const publicApiKey = event.env.get('VITE_MARVEL_PUBLIC_API_KEY');
  const privateApiKey = event.env.get('VITE_MARVEL_PRIVATE_API_KEY');
  const ts = Date.now().toString();
  const hash = Md5.hashStr(ts + privateApiKey + publicApiKey);

  return {
    publicApiKey,
    privateApiKey,
    baseURL,
    ts,
    hash,
  };
};

type MarvelContext = ReturnType<typeof getMarvelContext>;

type FetchMarvelArgs = {
  context: MarvelContext;
  path: string;
  query?: Partial<Record<string, string>>;
};

const fetchMarvel = async <T = unknown>({
  context,
  path,
  query,
}: FetchMarvelArgs): Promise<T> => {
  const params = buildSearchParams({
    apikey: context.publicApiKey,
    ts: context.ts,
    hash: context.hash,
    ...query,
  });

  const url = `${context.baseURL}/${path}?${params}`;
  const response = await fetch(url);

  if (!response.ok) {
    // eslint-disable-next-line no-console
    console.error(url);
    throw new Error(
      `[fetchMarvelAPI] An error occurred: ${response.statusText}`
    );
  }

  return response.json();
};

type GetCharactersArgs = {
  context: MarvelContext;
  page: number;
  limit: number;
  startsWith?: string;
};

export const getCharacters = async ({
  context,
  page,
  limit,
  startsWith,
}: GetCharactersArgs) => {
  const results = await fetchMarvel<DataWrapper<Character>>({
    context,
    path: 'characters',
    query: {
      offset: getOffset(page, limit),
      limit: String(limit),
      nameStartsWith: startsWith,
    },
  });

  results.data?.results?.forEach((item) => {
    item.mediaType = 'character';
  });

  return results;
};

type GetCharacterArgs = {
  context: MarvelContext;
  id: number;
};

export const getCharacter = async ({ context, id }: GetCharacterArgs) =>
  await fetchMarvel<DataWrapper<Character>>({
    context,
    path: `characters/${id}`,
  });

type GetCharacterComicsArgs = {
  context: MarvelContext;
  id: number;
  page: number;
  limit: number;
  dateDescriptor?: string;
};

export const getCharacterComics = async ({
  context,
  id,
  page,
  limit,
  dateDescriptor,
}: GetCharacterComicsArgs) => {
  const results = await fetchMarvel<DataWrapper<Comic>>({
    context,
    path: `characters/${id}/comics`,
    query: {
      offset: getOffset(page, limit),
      limit: String(limit),
      dateDescriptor,
    },
  });

  results.data?.results?.forEach((item) => {
    item.mediaType = 'comic';
  });

  return results;
};

type GetComicsArgs = {
  context: MarvelContext;
  page: number;
  limit: number;
  dateDescriptor?: string;
  startsWith?: string;
};

export const getComics = async ({
  context,
  page,
  limit,
  dateDescriptor,
  startsWith,
}: GetComicsArgs) => {
  const results = await fetchMarvel<DataWrapper<Comic>>({
    context,
    path: 'comics',
    query: {
      offset: getOffset(page, limit),
      dateDescriptor,
      titleStartsWith: startsWith,
      limit: String(limit),
    },
  });

  results.data?.results?.forEach((item) => {
    item.mediaType = 'comic';
  });

  return results;
};

type GetComicArgs = {
  context: MarvelContext;
  id: number;
};

export const getComic = async ({ context, id }: GetComicArgs) =>
  await fetchMarvel<DataWrapper<Comic>>({
    context,
    path: `comics/${id}`,
  });

type GetComicCharactersArgs = {
  context: MarvelContext;
  id: number;
};

export const getComicCharacters = async ({
  context,
  id,
}: GetComicCharactersArgs) => {
  const results = await fetchMarvel<DataWrapper<Character>>({
    context,
    path: `comics/${id}/characters`,
  });

  results.data?.results?.forEach((item) => {
    item.mediaType = 'character';
  });

  return results;
};

type GetRandomMediaArgs<T> = {
  collections: DataWrapper<T>[];
};

export const getRandomMedia = <T>({ collections }: GetRandomMediaArgs<T>) => {
  const items = collections.flatMap(
    (collection) => collection.data?.results || []
  );
  const randomItem = items[Math.floor(Math.random() * items.length)];
  return randomItem;
};
