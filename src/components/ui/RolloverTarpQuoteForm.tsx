"use client";

import { useState } from "react";
import FormConfirmation from "./FormConfirmation";

export default function RolloverTarpQuoteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      trailerType: (form.elements.namedItem("trailerType") as HTMLSelectElement).value,
      trailerLength: (form.elements.namedItem("trailerLength") as HTMLInputElement).value,
      trailerWidth: (form.elements.namedItem("trailerWidth") as HTMLInputElement).value,
      systemBrand: (form.elements.namedItem("systemBrand") as HTMLInputElement).value,
      vinylWeight: (form.elements.namedItem("vinylWeight") as HTMLSelectElement).value,
      details: (form.elements.namedItem("details") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/rollover-tarp-quote", {
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
    return <FormConfirmation type="quote" />;
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
        <label htmlFor="trailerType" className="block text-sm font-medium text-gray-700 mb-1">
          Trailer Type *
        </label>
        <select id="trailerType" name="trailerType" required className={inputClass}>
          <option value="">Select type</option>
          <option value="flatbed">Flatbed</option>
          <option value="open-top">Open Top</option>
          <option value="drop-deck">Drop Deck</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="trailerLength" className="block text-sm font-medium text-gray-700 mb-1">
            Trailer Length (ft) *
          </label>
          <input
            type="text"
            id="trailerLength"
            name="trailerLength"
            required
            placeholder='e.g. 48'
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="trailerWidth" className="block text-sm font-medium text-gray-700 mb-1">
            Trailer Width (in) *
          </label>
          <input
            type="text"
            id="trailerWidth"
            name="trailerWidth"
            required
            placeholder='e.g. 102'
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="systemBrand" className="block text-sm font-medium text-gray-700 mb-1">
          Rollover System Brand / Model
        </label>
        <input
          type="text"
          id="systemBrand"
          name="systemBrand"
          placeholder="e.g. Shur-Co, Aero, Mountain Tarp, etc."
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="vinylWeight" className="block text-sm font-medium text-gray-700 mb-1">
          Preferred Vinyl Weight
        </label>
        <select id="vinylWeight" name="vinylWeight" className={inputClass}>
          <option value="">Not sure</option>
          <option value="18oz">18 oz</option>
          <option value="22oz">22 oz</option>
        </select>
      </div>
      <div>
        <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
          Additional Details
        </label>
        <textarea
          id="details"
          name="details"
          rows={4}
          placeholder="Any other details about your setup — number of bows, arm style, special requirements, etc."
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
