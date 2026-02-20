"use client";

import { ProductOption } from "@/lib/types";
import { cn } from "@/lib/utils";

interface VariantSelectorProps {
  options: ProductOption[];
  selected: Record<string, string>;
  onChange: (optionName: string, value: string) => void;
}

export default function VariantSelector({
  options,
  selected,
  onChange,
}: VariantSelectorProps) {
  return (
    <div className="space-y-4">
      {options.map((option) => (
        <div key={option.name}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {option.name}:{" "}
            <span className="text-gray-900 font-semibold">
              {selected[option.name] || "Select"}
            </span>
          </label>
          {option.values.length <= 6 ? (
            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => (
                <button
                  key={value}
                  onClick={() => onChange(option.name, value)}
                  className={cn(
                    "px-4 py-2 text-sm rounded-md border transition-colors cursor-pointer",
                    selected[option.name] === value
                      ? "border-brand-500 bg-brand-50 text-dark-800 font-medium"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  )}
                >
                  {value}
                </button>
              ))}
            </div>
          ) : (
            <select
              value={selected[option.name] || ""}
              onChange={(e) => onChange(option.name, e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            >
              <option value="">Select {option.name}</option>
              {option.values.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
    </div>
  );
}
