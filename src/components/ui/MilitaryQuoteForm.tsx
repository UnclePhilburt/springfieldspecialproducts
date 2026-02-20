"use client";

import { useState } from "react";

export default function MilitaryQuoteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      category: "military",
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      organization: (form.elements.namedItem("organization") as HTMLInputElement).value,
      productType: (form.elements.namedItem("productType") as HTMLSelectElement).value,
      quantity: (form.elements.namedItem("quantity") as HTMLInputElement).value,
      dimensions: (form.elements.namedItem("dimensions") as HTMLInputElement).value,
      details: (form.elements.namedItem("details") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/trailer-cover-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <p className="text-green-800 font-medium">
          Thank you! We&apos;ve received your military procurement request and will
          respond promptly.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input type="text" id="name" name="name" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input type="tel" id="phone" name="phone" className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <input type="email" id="email" name="email" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
          Organization / Unit
        </label>
        <input
          type="text"
          id="organization"
          name="organization"
          placeholder="e.g. Fort Leonard Wood, National Guard, base name"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="productType" className="block text-sm font-medium text-gray-700 mb-1">
          Product Needed *
        </label>
        <select id="productType" name="productType" required className={inputClass}>
          <option value="">Select product type</option>
          <option value="tarps">Tarps / Covers</option>
          <option value="equipment-covers">Equipment Covers</option>
          <option value="vehicle-covers">Vehicle / Truck Covers</option>
          <option value="shelter">Shelter / Enclosure Panels</option>
          <option value="custom">Custom Vinyl Fabrication</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <input type="text" id="quantity" name="quantity" placeholder="e.g. 10" className={inputClass} />
        </div>
        <div>
          <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700 mb-1">
            Dimensions (if known)
          </label>
          <input type="text" id="dimensions" name="dimensions" placeholder="e.g. 12' x 20'" className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
          Additional Details
        </label>
        <textarea
          id="details"
          name="details"
          rows={4}
          placeholder="Material specs, color requirements, delivery timeline, any other details..."
          className={inputClass}
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again or call us at (417) 864-8461.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-brand-500 text-dark-900 py-3 px-6 rounded-lg font-semibold hover:bg-brand-400 disabled:bg-gray-300 transition-colors cursor-pointer"
      >
        {status === "sending" ? "Sending..." : "Submit Request"}
      </button>
    </form>
  );
}
