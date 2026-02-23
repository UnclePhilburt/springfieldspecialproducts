"use client";

import { useState } from "react";
import FormConfirmation from "./FormConfirmation";

export default function SafetyFoamMatQuoteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      category: "safety-foam-mat",
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      application: (form.elements.namedItem("application") as HTMLSelectElement).value,
      matLength: (form.elements.namedItem("matLength") as HTMLInputElement).value,
      matWidth: (form.elements.namedItem("matWidth") as HTMLInputElement).value,
      thickness: (form.elements.namedItem("thickness") as HTMLSelectElement).value,
      quantity: (form.elements.namedItem("quantity") as HTMLInputElement).value,
      vinylColor: (form.elements.namedItem("vinylColor") as HTMLInputElement).value,
      details: (form.elements.namedItem("details") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/safety-foam-mat-quote", {
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
        <label htmlFor="application" className="block text-sm font-medium text-gray-700 mb-1">
          What Is This For? *
        </label>
        <select id="application" name="application" required className={inputClass}>
          <option value="">Select application</option>
          <option value="playground">Playground</option>
          <option value="gym">Gym / Fitness</option>
          <option value="workshop">Workshop / Garage</option>
          <option value="industrial">Industrial / Factory</option>
          <option value="livestock">Livestock / Barn</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="matLength" className="block text-sm font-medium text-gray-700 mb-1">
            Length (ft) *
          </label>
          <input type="text" id="matLength" name="matLength" required placeholder="e.g. 6" className={inputClass} />
        </div>
        <div>
          <label htmlFor="matWidth" className="block text-sm font-medium text-gray-700 mb-1">
            Width (ft) *
          </label>
          <input type="text" id="matWidth" name="matWidth" required placeholder="e.g. 4" className={inputClass} />
        </div>
        <div>
          <label htmlFor="thickness" className="block text-sm font-medium text-gray-700 mb-1">
            Thickness *
          </label>
          <select id="thickness" name="thickness" required className={inputClass}>
            <option value="">Select</option>
            <option value="2in">2&quot;</option>
            <option value="3in">3&quot;</option>
            <option value="4in">4&quot;</option>
            <option value="6in">6&quot;</option>
            <option value="other">Other / Not Sure</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <input type="text" id="quantity" name="quantity" placeholder="1" className={inputClass} />
        </div>
        <div>
          <label htmlFor="vinylColor" className="block text-sm font-medium text-gray-700 mb-1">
            Vinyl Color Preference
          </label>
          <input type="text" id="vinylColor" name="vinylColor" placeholder="e.g. Blue, Red, Black" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
          Additional Details
        </label>
        <textarea
          id="details"
          name="details"
          rows={3}
          placeholder="Special shapes, cutouts, carrying handles, Velcro connections, firmness preference, etc."
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
