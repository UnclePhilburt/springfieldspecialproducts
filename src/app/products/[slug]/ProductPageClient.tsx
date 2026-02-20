"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import VariantSelector from "@/components/ui/VariantSelector";
import SnipcartButton from "@/components/ui/SnipcartButton";

export default function ProductPageClient({ product }: { product: Product }) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {};
    product.options.forEach((opt) => {
      if (opt.values.length > 0) {
        defaults[opt.name] = opt.values[0];
      }
    });
    return defaults;
  });

  // Find matching variant based on selected options
  function getSelectedVariant() {
    if (product.variants.length <= 1) return product.variants[0];

    return product.variants.find((v) => {
      // Match variant name against selected options
      const selectedValues = Object.values(selectedOptions);
      return selectedValues.every((val) => v.name.includes(val));
    }) || product.variants[0];
  }

  const selectedVariant = getSelectedVariant();
  const currentPrice = selectedVariant?.price ?? product.price;
  const inStock = selectedVariant?.inStock ?? product.inStock;

  function handleOptionChange(optionName: string, value: string) {
    setSelectedOptions((prev) => ({ ...prev, [optionName]: value }));
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Image */}
      <div className="aspect-square relative bg-gray-50 rounded-lg overflow-hidden">
        <Image
          src={product.images[0] || "/images/placeholder-product.svg"}
          alt={product.name}
          fill
          className="object-contain p-8"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Product Info */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {product.name}
        </h1>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-2xl font-bold text-dark-800">
            {formatPrice(currentPrice)}
          </span>
          {inStock ? (
            <span className="text-sm text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
              In Stock
            </span>
          ) : (
            <span className="text-sm text-red-700 bg-red-50 px-2 py-0.5 rounded-full">
              Out of Stock
            </span>
          )}
        </div>

        {selectedVariant?.sku && (
          <p className="mt-1 text-sm text-gray-400">SKU: {selectedVariant.sku}</p>
        )}

        {/* Variant Selection */}
        {product.options.length > 0 && (
          <div className="mt-6">
            <VariantSelector
              options={product.options}
              selected={selectedOptions}
              onChange={handleOptionChange}
            />
          </div>
        )}

        {/* Add to Cart */}
        <div className="mt-6">
          <SnipcartButton
            product={product}
            selectedOptions={selectedOptions}
            selectedPrice={currentPrice}
            disabled={!inStock}
          />
        </div>

        {/* Description */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Description
          </h2>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        {/* Specs */}
        {product.specs.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Specifications
            </h2>
            <dl className="divide-y divide-gray-100">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex justify-between py-2 text-sm"
                >
                  <dt className="text-gray-500">{spec.label}</dt>
                  <dd className="text-gray-900 font-medium">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}
