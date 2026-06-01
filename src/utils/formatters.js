export function formatCurrency(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "$0.00";
  }

  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(amount);
}

/**
 * Format date to Australian format
 * Example: 01/06/2026
 */
export function formatDate(date) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-AU");
}

/**
 * Format percentage
 * Example: 25%
 */
export function formatPercentage(value) {
  if (value === null || value === undefined || isNaN(value)) {
    return "0%";
  }

  return `${Number(value).toFixed(0)}%`;
}

/**
 * Capitalise first letter
 * Example: "checking" -> "Checking"
 */
export function capitalize(text) {
  if (!text) return "";

  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Shorten large numbers
 * Example:
 * 1200 -> 1.2K
 * 1500000 -> 1.5M
 */
export function formatCompactNumber(value) {
  if (value === null || value === undefined || isNaN(value)) {
    return "0";
  }

  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}