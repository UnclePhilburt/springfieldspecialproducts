"use client";

import { useState } from "react";
import FormConfirmation from "./FormConfirmation";

export default function DumpTruckTarpQuoteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      category: "dump-truck-tarp",
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      truckType: (form.elements.namedItem("truckType") as HTMLSelectElement).value,
      bedLength: (form.elements.namedItem("bedLength") as HTMLInputElement).value,
      bedWidth: (form.elements.namedItem("bedWidth") as HTMLInputElement).value,
      sideHeight: (form.elements.namedItem("sideHeight") as HTMLInputElement).value,
      tarpSystem: (form.elements.namedItem("tarpSystem") as HTMLSelectElement).value,
      hauling: (form.elements.namedItem("hauling") as HTMLInputElement).value,
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
        <label htmlFor="truckType" className="block text-sm font-medium text-gray-700 mb-1">
          Truck / Container Type *
        </label>
        <select id="truckType" name="truckType" required className={inputClass}>
          <option value="">Select type</option>
          <option value="dump-truck">Dump Truck</option>
          <option value="end-dump">End Dump Trailer</option>
          <option value="belly-dump">Belly Dump Trailer</option>
          <option value="roll-off">Roll-Off Container</option>
          <option value="side-dump">Side Dump</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="bedLength" className="block text-sm font-medium text-gray-700 mb-1">
            Bed Length (ft) *
          </label>
          <input type="text" id="bedLength" name="bedLength" required placeholder="e.g. 18" className={inputClass} />
        </div>
        <div>
          <label htmlFor="bedWidth" className="block text-sm font-medium text-gray-700 mb-1">
            Bed Width (ft) *
          </label>
          <input type="text" id="bedWidth" name="bedWidth" required placeholder="e.g. 8" className={inputClass} />
        </div>
        <div>
          <label htmlFor="sideHeight" className="block text-sm font-medium text-gray-700 mb-1">
            Side Height (ft)
          </label>
          <input type="text" id="sideHeight" name="sideHeight" placeholder="e.g. 4" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="tarpSystem" className="block text-sm font-medium text-gray-700 mb-1">
          Tarp System
        </label>
        <select id="tarpSystem" name="tarpSystem" className={inputClass}>
          <option value="">No system / manual</option>
          <option value="manual-arm">Manual Arm System</option>
          <option value="electric">Electric / Automatic</option>
          <option value="cable">Cable System</option>
          <option value="not-sure">Not Sure</option>
        </select>
      </div>

      <div>
        <label htmlFor="hauling" className="block text-sm font-medium text-gray-700 mb-1">
          What Do You Typically Haul?
        </label>
        <input
          type="text"
          id="hauling"
          name="hauling"
          placeholder="e.g. gravel, dirt, asphalt, demolition debris"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        <div>
          <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
            Color Preference
          </label>
          <input type="text" id="color" name="color" placeholder="e.g. Black" className={inputClass} />
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
          placeholder="Existing tarp brand, attachment style, mesh vs solid, anything else we should know..."
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
