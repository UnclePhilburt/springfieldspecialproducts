import { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import StockTrailerCoverQuoteForm from "@/components/ui/StockTrailerCoverQuoteForm";
import PhotoGallery from "@/components/ui/PhotoGallery";
import { galleryPhotos } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Stock Trailer Cover Quote",
  description:
    "Get a custom quote for a heavy-duty vinyl stock trailer cover. Built to your trailer dimensions with heat-welded seams.",
};

export default function StockTrailerCoverQuotePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: "Trailer Covers", href: "/collections/trailer-covers" },
          { label: "Stock Trailer Covers" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Stock Trailer Covers
          </h1>
          <p className="text-gray-600 mb-6">
            Every stock trailer cover we build is custom-fitted to your trailer.
            Heavy-duty vinyl with heat-welded seams protects your livestock from
            sun, rain, and wind during transport.
          </p>

          <div className="mb-8">
            <PhotoGallery photos={galleryPhotos["stock-trailer-covers"] || []} />
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            What We Need to Know
          </h2>
          <ul className="space-y-3 text-gray-600 mb-8">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Trailer length, width, and height
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Preferred vinyl weight and color
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Any special requirements (cutouts, flaps, etc.)
            </li>
          </ul>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Built to Last</h3>
            <p className="text-sm text-gray-600">
              Our stock trailer covers are made with heavy-duty 18 oz or 22 oz
              vinyl and heat-welded seams for a watertight seal that holds up
              year after year.
            </p>
          </div>

          <div className="bg-brand-50 rounded-lg p-6">
            <p className="text-sm text-dark-800">
              <strong>Prefer to call?</strong> Reach us at{" "}
              <a href="tel:4178648461" className="font-semibold underline">
                (417) 864-8461
              </a>{" "}
              to discuss your stock trailer cover.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Get a Quote
          </h2>
          <StockTrailerCoverQuoteForm />
        </div>
      </div>
    </div>
  );
}
