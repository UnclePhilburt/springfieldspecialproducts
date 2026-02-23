import { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import MilitaryQuoteForm from "@/components/ui/MilitaryQuoteForm";

export const metadata: Metadata = {
  title: "Military Procurement Quote",
  description:
    "Request a quote for military-grade vinyl tarps, covers, and custom fabrication. Made in Missouri for U.S. service members.",
};

export default function MilitaryQuotePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Military Quote" }]} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 border border-amber-300 rounded text-xs font-bold tracking-wider text-amber-800 uppercase">
              USA-Made
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 border border-blue-300 rounded text-xs font-bold tracking-wider text-blue-800 uppercase">
              Military Supply
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Military Procurement
          </h1>
          <p className="text-gray-600 mb-6">
            We manufacture heavy-duty vinyl products for U.S. military buyers.
            Every product is built to withstand extreme conditions — UV exposure,
            sub-zero temperatures, and daily field use.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            What We Supply
          </h2>
          <ul className="space-y-3 text-gray-600 mb-8">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Custom tarps and covers to spec
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Vehicle and equipment covers
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Shelter and enclosure panels
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Bulk orders and repeat contracts
            </li>
          </ul>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Built for the Field</h3>
            <p className="text-sm text-gray-600">
              18 oz and 22 oz vinyl with heat-welded seams. UV-resistant,
              cold-weather rated, and made to handle years of hard use.
              Manufactured in Springfield, Missouri.
            </p>
          </div>

          <p className="mt-4 text-xs text-gray-400">
            Products supplied to authorized military purchasers. No Department of Defense endorsement implied.
          </p>
        </div>

        <div>
          <div className="bg-brand-50 border border-brand-200 rounded-xl p-6 sm:p-8 mb-6 text-center">
            <p className="text-sm font-medium text-dark-700 mb-1">Fastest way to get your quote</p>
            <a
              href="tel:4178648461"
              className="inline-flex items-center gap-2 text-2xl font-bold text-dark-900 hover:text-brand-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (417) 864-8461
            </a>
            <p className="text-xs text-gray-500 mt-2">Mon–Fri, 8am–4:30pm CST</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Or, Send Us the Details
            </h2>
            <p className="text-sm text-gray-500 mb-6">We&apos;ll get back to you within 1–2 business days.</p>
          <MilitaryQuoteForm />
          </div>
        </div>
      </div>
    </div>
  );
}
