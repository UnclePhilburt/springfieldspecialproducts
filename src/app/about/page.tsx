import { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Springfield Special Products manufactures premium custom heavy-duty vinyl products in Springfield, Missouri.",
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "About" }]} />

      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About Us</h1>

        <div className="prose prose-gray max-w-none space-y-6">
          <p className="text-lg text-gray-600 leading-relaxed">
            Springfield Special Products is a manufacturer of premium custom
            heavy-duty vinyl products based in Springfield, Missouri. We
            specialize in ratchet straps, RV skirts, trailer covers, and custom
            tarps built for professionals who demand durability and reliability.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">
            What We Make
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>
                <strong className="text-gray-900">Ratchet Straps & Hardware</strong> —
                Complete assemblies and individual components rated for professional cargo control.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>
                <strong className="text-gray-900">RV Skirts</strong> —
                Custom-fitted 18 oz vinyl skirting that prevents frozen pipes and
                cuts heating costs during winter months.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>
                <strong className="text-gray-900">Trailer Covers & Tarps</strong> —
                Industrial-grade 22 oz vinyl covers with heat-welded seams built to
                withstand years of highway travel.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>
                <strong className="text-gray-900">Repairs</strong> —
                Professional repair services for tarps, covers, straps, and all
                vinyl products.
              </span>
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">
            Our Location
          </h2>
          <p className="text-gray-600">
            We&apos;re located at <strong>2045 N. National Ave, Springfield, MO</strong>.
            Give us a call at{" "}
            <a href="tel:4178648461" className="text-brand-700 hover:text-brand-800 font-medium">
              (417) 864-8461
            </a>{" "}
            for custom quotes, product questions, or to schedule a repair.
          </p>
        </div>
      </div>
    </div>
  );
}
