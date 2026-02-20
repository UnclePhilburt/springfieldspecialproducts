"use client";

import { Product } from "@/lib/types";

interface SnipcartButtonProps {
  product: Product;
  selectedOptions: Record<string, string>;
  selectedPrice: number;
  disabled?: boolean;
}

export default function SnipcartButton({
  product,
  selectedOptions,
  selectedPrice,
  disabled,
}: SnipcartButtonProps) {
  const customFields: Record<string, string | number> = {};

  product.options.forEach((option, index) => {
    const num = index + 1;
    customFields[`data-item-custom${num}-name`] = option.name;
    customFields[`data-item-custom${num}-options`] = option.values.join("|");
    if (selectedOptions[option.name]) {
      customFields[`data-item-custom${num}-value`] = selectedOptions[option.name];
    }
  });

  return (
    <button
      className="snipcart-add-item w-full bg-brand-500 text-dark-900 py-3 px-6 rounded-lg font-semibold hover:bg-brand-400 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors cursor-pointer"
      data-item-id={product.id}
      data-item-name={product.name}
      data-item-price={selectedPrice}
      data-item-url={`/products/${product.slug}`}
      data-item-image={product.images[0] || "/images/placeholder-product.svg"}
      data-item-description={product.shortDescription}
      {...customFields}
      disabled={disabled}
    >
      {disabled ? "Out of Stock" : "Add to Cart"}
    </button>
  );
}
