import { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import RepairQuoteForm from "@/components/ui/RepairQuoteForm";

export const metadata: Metadata = {
  title: "Repairs",
  description:
    "Professional repair services for tarps, covers, straps, and vinyl products. Get a free repair quote from Springfield Special Products.",
};

export default function RepairsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Repairs" }]} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Repair Services
          </h1>
          <p className="text-gray-600 mb-6">
            Don&apos;t replace it — repair it. We provide professional repair
            services for tarps, trailer covers, RV skirts, ratchet straps, and
            all types of vinyl products.
          </p>

          <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-8">
            <Image
              src="/images/repairmonstertruck.jpg"
              alt="Vinyl repair work"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            What We Repair
          </h2>
          <ul className="space-y-3 text-gray-600 mb-8">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Torn or ripped tarps and covers
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Worn or frayed ratchet straps
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Damaged grommets, snaps, and fasteners
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Failed seams and heat-weld repairs
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Custom modifications and resizing
            </li>
          </ul>

          <div className="bg-brand-50 rounded-lg p-6">
            <p className="text-sm text-dark-800">
              <strong>Prefer to call?</strong> Reach us at{" "}
              <a href="tel:4178648461" className="font-semibold underline">
                (417) 864-8461
              </a>{" "}
              to discuss your repair needs.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-gray-50 rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Request a Repair Quote
          </h2>
          <RepairQuoteForm />
        </div>
      </div>
    </div>
  );
}
