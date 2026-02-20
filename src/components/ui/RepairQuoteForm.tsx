"use client";

import { useState } from "react";

export default function RepairQuoteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      itemType: (form.elements.namedItem("itemType") as HTMLSelectElement).value,
      description: (form.elements.namedItem("description") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/repair-quote", {
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
          Thank you! We&apos;ve received your repair request and will get back to you
          with a quote.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
        />
      </div>
      <div>
        <label htmlFor="itemType" className="block text-sm font-medium text-gray-700 mb-1">
          Item Type *
        </label>
        <select
          id="itemType"
          name="itemType"
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
        >
          <option value="">Select type</option>
          <option value="tarp">Tarp</option>
          <option value="trailer-cover">Trailer Cover</option>
          <option value="rv-skirt">RV Skirt</option>
          <option value="ratchet-strap">Ratchet Strap</option>
          <option value="other">Other Vinyl Product</option>
        </select>
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Describe the Damage / Repair Needed *
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          required
          placeholder="Please describe the item, the damage, and what kind of repair you need..."
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
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
        {status === "sending" ? "Sending..." : "Request Repair Quote"}
      </button>
    </form>
  );
}
