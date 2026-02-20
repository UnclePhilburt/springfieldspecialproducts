"use client";

import { useState } from "react";

export default function AgricultureTarpQuoteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      category: "agriculture-tarp",
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      tarpType: (form.elements.namedItem("tarpType") as HTMLSelectElement).value,
      length: (form.elements.namedItem("tarpLength") as HTMLInputElement).value,
      width: (form.elements.namedItem("tarpWidth") as HTMLInputElement).value,
      quantity: (form.elements.namedItem("quantity") as HTMLInputElement).value,
      covering: (form.elements.namedItem("covering") as HTMLInputElement).value,
      indoorOutdoor: (form.elements.namedItem("indoorOutdoor") as HTMLSelectElement).value,
      vinylWeight: (form.elements.namedItem("vinylWeight") as HTMLSelectElement).value,
      color: (form.elements.namedItem("color") as HTMLInputElement).value,
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
          Thank you! We&apos;ve received your quote request and will get back to
          you with pricing.
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
        <label htmlFor="tarpType" className="block text-sm font-medium text-gray-700 mb-1">
          What Do You Need? *
        </label>
        <select id="tarpType" name="tarpType" required className={inputClass}>
          <option value="">Select type</option>
          <option value="grain-trailer">Grain Trailer Tarp</option>
          <option value="hay-cover">Hay / Round Bale Cover</option>
          <option value="silage">Silage Cover</option>
          <option value="equipment-cover">Equipment / Machinery Cover</option>
          <option value="wagon-cover">Wagon Cover</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="covering" className="block text-sm font-medium text-gray-700 mb-1">
          What Are You Covering? *
        </label>
        <input
          type="text"
          id="covering"
          name="covering"
          required
          placeholder="e.g. 20 round bales stacked 2 high, grain trailer bed, tractor"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="tarpLength" className="block text-sm font-medium text-gray-700 mb-1">
            Length (ft)
          </label>
          <input type="text" id="tarpLength" name="tarpLength" placeholder="e.g. 20" className={inputClass} />
        </div>
        <div>
          <label htmlFor="tarpWidth" className="block text-sm font-medium text-gray-700 mb-1">
            Width (ft)
          </label>
          <input type="text" id="tarpWidth" name="tarpWidth" placeholder="e.g. 24" className={inputClass} />
        </div>
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <input type="text" id="quantity" name="quantity" placeholder="1" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="indoorOutdoor" className="block text-sm font-medium text-gray-700 mb-1">
            Indoor or Outdoor Use?
          </label>
          <select id="indoorOutdoor" name="indoorOutdoor" className={inputClass}>
            <option value="">Select</option>
            <option value="outdoor">Outdoor (sun, rain, snow)</option>
            <option value="indoor">Indoor / Under Roof</option>
            <option value="both">Both</option>
          </select>
        </div>
        <div>
          <label htmlFor="vinylWeight" className="block text-sm font-medium text-gray-700 mb-1">
            Vinyl Weight
          </label>
          <select id="vinylWeight" name="vinylWeight" className={inputClass}>
            <option value="">Not sure</option>
            <option value="18oz">18 oz</option>
            <option value="22oz">22 oz</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
          Color Preference
        </label>
        <input type="text" id="color" name="color" placeholder="e.g. Black, Green, White" className={inputClass} />
      </div>

      <div>
        <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
          Additional Details
        </label>
        <textarea
          id="details"
          name="details"
          rows={3}
          placeholder="Tie-down method, grommets, straps, D-rings, anything else we should know..."
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
        {status === "sending" ? "Sending..." : "Request a Quote"}
      </button>
    </form>
  );
}
