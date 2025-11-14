export function formatCurrency(value: number, currencySymbol = "€"): string {
  if (isNaN(value)) return `${currencySymbol}0.00`;
  return `${currencySymbol}${value.toFixed(2)}`;
}
