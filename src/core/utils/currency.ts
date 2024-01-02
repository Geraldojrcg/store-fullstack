export function formatToCurrency(value: number) {
  return new Intl.NumberFormat(Intl.NumberFormat().resolvedOptions().locale, {
    style: "currency",
    currency: Intl.NumberFormat().resolvedOptions().currency ?? "USD",
  }).format(value);
}
