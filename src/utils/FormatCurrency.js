/**
 * Formats a number as USD currency.
 * Example: formatCurrency(29.9) → "$29.90"
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}