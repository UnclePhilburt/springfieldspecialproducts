import { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import DumpTruckTarpQuoteForm from "@/components/ui/DumpTruckTarpQuoteForm";
import PhotoGallery from "@/components/ui/PhotoGallery";
import { galleryPhotos } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Dump Truck Tarp Quote",
  description:
    "Get a custom quote for a heavy-duty dump truck tarp. Built to handle daily abuse on construction sites.",
};

export default function DumpTruckTarpQuotePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: "Trailer Covers", href: "/collections/trailer-covers" },
          { label: "Dump Truck Tarps" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Dump Truck Tarps
          </h1>
          <p className="text-gray-600 mb-6">
            Heavy-duty vinyl tarps for dump trucks and roll-off containers.
            Every tarp is built to your truck&apos;s dimensions so it fits right and
            holds up to daily use on the job site.
          </p>

          <div className="mb-8">
            <PhotoGallery photos={galleryPhotos["dump-truck-tarps"] || []} />
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            What We Need to Know
          </h2>
          <ul className="space-y-3 text-gray-600 mb-8">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Bed length, width, and side height
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Truck type (dump truck, roll-off, etc.)
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Preferred vinyl weight and color
            </li>
          </ul>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Built Tough</h3>
            <p className="text-sm text-gray-600">
              Our dump truck tarps are made with 22 oz vinyl, reinforced edges,
              and heat-welded seams. Built to handle the demands of construction
              and hauling.
            </p>
          </div>

          <div className="bg-brand-50 rounded-lg p-6">
            <p className="text-sm text-dark-800">
              <strong>Prefer to call?</strong> Reach us at{" "}
              <a href="tel:4178648461" className="font-semibold underline">
                (417) 864-8461
              </a>{" "}
              to discuss your dump truck tarp.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Get a Quote
          </h2>
          <DumpTruckTarpQuoteForm />
        </div>
      </div>
    </div>
  );
}
