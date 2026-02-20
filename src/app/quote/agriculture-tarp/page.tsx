import { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import AgricultureTarpQuoteForm from "@/components/ui/AgricultureTarpQuoteForm";
import PhotoGallery from "@/components/ui/PhotoGallery";
import { galleryPhotos } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Agriculture Tarp Quote",
  description:
    "Get a custom quote for grain trailer tarps, hay covers, and agricultural vinyl tarps. Built to protect your crops and equipment.",
};

export default function AgricultureTarpQuotePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: "Trailer Covers", href: "/collections/trailer-covers" },
          { label: "Agriculture Tarps" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Agriculture Tarps
          </h1>
          <p className="text-gray-600 mb-6">
            Durable vinyl tarps for grain trailers, hay covers, round bales,
            and agricultural equipment. Every tarp is made to your dimensions
            with UV-resistant vinyl built to handle the elements.
          </p>

          <div className="mb-8">
            <PhotoGallery photos={galleryPhotos["agriculture-tarps"] || []} />
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            What We Make
          </h2>
          <ul className="space-y-3 text-gray-600 mb-8">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Grain trailer tarps
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Hay and round bale covers
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Equipment and machinery covers
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Custom sizes and shapes
            </li>
          </ul>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Weather Tough</h3>
            <p className="text-sm text-gray-600">
              Our agriculture tarps are made with UV-resistant 18 oz or 22 oz
              vinyl and heat-welded seams. They hold up through rain, snow, wind,
              and sun season after season.
            </p>
          </div>

          <div className="bg-brand-50 rounded-lg p-6">
            <p className="text-sm text-dark-800">
              <strong>Prefer to call?</strong> Reach us at{" "}
              <a href="tel:4178648461" className="font-semibold underline">
                (417) 864-8461
              </a>{" "}
              to discuss your agriculture tarp needs.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Get a Quote
          </h2>
          <AgricultureTarpQuoteForm />
        </div>
      </div>
    </div>
  );
}
