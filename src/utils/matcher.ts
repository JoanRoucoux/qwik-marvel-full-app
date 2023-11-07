const matched = (value: any) => ({
  on: () => matched(value),
  otherwise: () => value,
});

export const Matcher = (value?: any) => ({
  on: (predicat: (arg0: any) => any, fn: (arg0: any) => any) =>
    predicat(value) ? matched(fn(value)) : Matcher(value),
  otherwise: (fn: (arg0: any) => any) => fn(value),
});
