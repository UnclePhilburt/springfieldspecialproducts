export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function formatPriceRange(min: number, max: number): string {
  if (min === max) return formatPrice(min);
  return `${formatPrice(min)} – ${formatPrice(max)}`;
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
