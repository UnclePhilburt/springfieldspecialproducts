import { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SafetyFoamMatQuoteForm from "@/components/ui/SafetyFoamMatQuoteForm";
import PhotoGallery from "@/components/ui/PhotoGallery";
import { galleryPhotos } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Safety Foam Mat Quote",
  description:
    "Get a custom quote for vinyl-covered safety foam mats. Built for gyms, playgrounds, workshops, and industrial use.",
};

export default function SafetyFoamMatQuotePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Safety Foam Mats" }]} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Safety Foam Mats
          </h1>
          <p className="text-gray-600 mb-6">
            Custom-cut vinyl-covered foam mats built for impact absorption and
            durability. Every mat is made to your exact size and specs.
          </p>

          <div className="mb-8">
            <PhotoGallery photos={galleryPhotos["safety-foam-mats"] || []} />
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Common Applications
          </h2>
          <ul className="space-y-3 text-gray-600 mb-8">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Playground fall zones
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Gym and fitness areas
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Workshop and garage floors
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Industrial and factory settings
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Livestock and barn use
            </li>
          </ul>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Vinyl Covered &amp; Sealed</h3>
            <p className="text-sm text-gray-600">
              Each mat is wrapped in heavy-duty vinyl with heat-welded seams,
              making them waterproof, easy to clean, and built to last through
              heavy daily use.
            </p>
          </div>

          <div className="bg-brand-50 rounded-lg p-6">
            <p className="text-sm text-dark-800">
              <strong>Prefer to call?</strong> Reach us at{" "}
              <a href="tel:4178648461" className="font-semibold underline">
                (417) 864-8461
              </a>{" "}
              to discuss your foam mat needs.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Get a Quote
          </h2>
          <SafetyFoamMatQuoteForm />
        </div>
      </div>
    </div>
  );
}
