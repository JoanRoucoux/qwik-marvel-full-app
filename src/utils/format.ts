export const getYear = (): number => new Date().getFullYear();

export const formatCurrency = (amount?: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
  });

  return formatter.format(amount || 0);
};

export const getOffset = (page: number, limit: number): string =>
  String(limit * (page - 1));

export const getTotalPages = (
  total: number | undefined,
  limit: number
): number => (total ? Math.ceil(total / limit) : 1);
