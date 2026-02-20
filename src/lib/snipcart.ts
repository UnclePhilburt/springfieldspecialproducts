import { Product } from "./types";

export function buildSnipcartAttributes(
  product: Product,
  selectedOptions: Record<string, string>,
  selectedPrice: number
): Record<string, string | number> {
  const attrs: Record<string, string | number> = {
    "data-item-id": product.id,
    "data-item-name": product.name,
    "data-item-price": selectedPrice,
    "data-item-url": `/products/${product.slug}`,
    "data-item-image": product.images[0] || "/images/placeholder-product.svg",
    "data-item-description": product.shortDescription,
  };

  product.options.forEach((option, index) => {
    const num = index + 1;
    attrs[`data-item-custom${num}-name`] = option.name;
    attrs[`data-item-custom${num}-options`] = option.values.join("|");
    if (selectedOptions[option.name]) {
      attrs[`data-item-custom${num}-value`] = selectedOptions[option.name];
    }
  });

  return attrs;
}
