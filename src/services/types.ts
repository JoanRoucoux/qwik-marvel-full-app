export type Nullable<T> = T | null;

export type DataWrapper<T> = {
  code?: number;
  status?: Nullable<string>;
  copyright?: Nullable<string>;
  attributionTextisplay?: Nullable<string>;
  attributionHTML?: Nullable<string>;
  data?: DataContainer<T>;
  etag?: Nullable<string>;
};

export type DataContainer<T> = {
  offset?: number;
  limit?: number;
  total?: number;
  count?: number;
  results?: T[];
};

export type Url = {
  type?: Nullable<string>;
  url?: Nullable<string>;
};

export type Image = {
  path?: Nullable<string>;
  extension?: Nullable<string>;
};

export type ResourceList = {
  available?: number;
  returned?: number;
  collectionURI?: Nullable<string>;
  items?: ResourceSummary[];
};

export type ResourceSummary = {
  resourceURI?: Nullable<string>;
  name?: Nullable<string>;
  type?: Nullable<string>;
  role?: Nullable<string>;
};

export type TextObject = {
  type?: Nullable<string>;
  language?: Nullable<string>;
  text?: Nullable<string>;
};

export type ComicDate = {
  type?: Nullable<string>;
  date?: Nullable<string>;
};

export type ComicPrice = {
  type?: Nullable<string>;
  price?: number;
};

export type Character = {
  id: number;
  name?: Nullable<string>;
  description?: Nullable<string>;
  mediaType?: Nullable<string>;
  modified?: Nullable<string>;
  resourceURI?: Nullable<string>;
  urls?: Url[];
  thumbnail?: Image;
  comics?: ResourceList;
  stories?: ResourceList;
  events?: ResourceList;
  series?: ResourceList;
};

export type Comic = {
  id: number;
  digitalId?: number;
  title?: Nullable<string>;
  issueNumber?: number;
  variantDescription?: Nullable<string>;
  description?: Nullable<string>;
  mediaType?: Nullable<string>;
  modified?: Nullable<string>;
  isbn?: Nullable<string>;
  upc?: Nullable<string>;
  diamondCode?: Nullable<string>;
  ean?: Nullable<string>;
  issn?: Nullable<string>;
  format?: Nullable<string>;
  pageCount?: number;
  textObjects?: TextObject[];
  resourceURI?: Nullable<string>;
  urls?: Url[];
  series?: ResourceSummary;
  variants?: ResourceSummary[];
  collections?: ResourceSummary[];
  collectedIssues?: ResourceSummary[];
  dates?: ComicDate[];
  prices?: ComicPrice[];
  thumbnail?: Image;
  images?: Image[];
  creators?: ResourceList;
  characters?: ResourceList;
  stories?: ResourceList;
  events?: ResourceList;
};

export type Media = Character | Comic;

export type MediaType = 'character' | 'comic';
