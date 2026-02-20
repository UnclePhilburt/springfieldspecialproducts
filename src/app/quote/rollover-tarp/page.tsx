import { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import RolloverTarpQuoteForm from "@/components/ui/RolloverTarpQuoteForm";
import PhotoGallery from "@/components/ui/PhotoGallery";
import { galleryPhotos } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Rollover Tarp Quote",
  description:
    "Get a custom quote for a heavy-duty vinyl rollover tarp. Built to fit your trailer and rollover system.",
};

export default function RolloverTarpQuotePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: "Trailer Covers", href: "/collections/trailer-covers" },
          { label: "Rollover Tarps" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Rollover Tarps
          </h1>
          <p className="text-gray-600 mb-6">
            Every rollover tarp we make is cut to fit your specific trailer and
            system. Tell us about your setup and we&apos;ll get you a quote.
          </p>

          <div className="mb-8">
            <PhotoGallery photos={galleryPhotos["rollover-tarps"] || []} />
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            What We Need to Know
          </h2>
          <ul className="space-y-3 text-gray-600 mb-8">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Trailer type, length, and width
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Rollover system brand and model (if known)
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Number of bows and arm style
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Preferred vinyl weight (18 oz or 22 oz)
            </li>
          </ul>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Built to Last</h3>
            <p className="text-sm text-gray-600">
              All our rollover tarps are made with heavy-duty vinyl and
              heat-welded seams. We build them to handle years of daily use on
              the road.
            </p>
          </div>

          <div className="bg-brand-50 rounded-lg p-6">
            <p className="text-sm text-dark-800">
              <strong>Prefer to call?</strong> Reach us at{" "}
              <a href="tel:4178648461" className="font-semibold underline">
                (417) 864-8461
              </a>{" "}
              to discuss your rollover tarp needs.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-gray-50 rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Get a Rollover Tarp Quote
          </h2>
          <RolloverTarpQuoteForm />
        </div>
      </div>
    </div>
  );
}
