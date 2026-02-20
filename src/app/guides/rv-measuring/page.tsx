import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "RV Skirting Measuring Guide",
  description:
    "Step-by-step guide to measuring your RV for custom skirting. Get accurate measurements for a perfect fit.",
};

export default function RVMeasuringGuidePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: "RV Skirts", href: "/collections/rv-skirts" },
          { label: "Measuring Guide" },
        ]}
      />

      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          RV Skirting Measuring Guide
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Accurate measurements are key to a great-fitting RV skirt. Follow
          these steps to measure your RV&apos;s perimeter.
        </p>

        {/* Steps */}
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-dark-800 text-brand-400 rounded-full flex items-center justify-center font-bold text-lg">
              1
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Measure the Perimeter
              </h2>
              <p className="text-gray-600">
                Using a tape measure, measure the entire perimeter of your RV at
                ground level. Start at the front corner and go all the way
                around. This is the total length of skirting you&apos;ll need. Measure
                in feet and round up to the nearest 5 feet.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-dark-800 text-brand-400 rounded-full flex items-center justify-center font-bold text-lg">
              2
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Measure the Height
              </h2>
              <p className="text-gray-600">
                Measure from the bottom edge of your RV (where the skirting will
                attach) straight down to the ground. Measure at several points
                around the RV, as ground level may vary. We&apos;ll use the tallest
                measurement.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-dark-800 text-brand-400 rounded-full flex items-center justify-center font-bold text-lg">
              3
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Note Access Points
              </h2>
              <p className="text-gray-600">
                Identify where you need access openings — utility hookups, doors,
                storage compartments, etc. Note their location and size so we can
                include access panels in your skirt.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-dark-800 text-brand-400 rounded-full flex items-center justify-center font-bold text-lg">
              4
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Fifth-Wheel Front Area
              </h2>
              <p className="text-gray-600">
                If you have a fifth-wheel RV, the front hitch area needs a
                separate skirt panel. Measure the front area separately. We offer
                a{" "}
                <Link
                  href="/products/fifth-wheel-skirt-addon"
                  className="text-brand-700 hover:text-brand-800 font-medium"
                >
                  Fifth-Wheel Skirt Add-On
                </Link>{" "}
                specifically for this.
              </p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-12 bg-accent-500/10 border border-accent-500/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Tips for Accurate Measurements
          </h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>- Measure on a level surface when possible</li>
            <li>- If your RV is on uneven ground, measure height at the highest point</li>
            <li>- Round perimeter up to the nearest 5 feet</li>
            <li>- Take photos of your RV from all sides — helpful for our team</li>
            <li>- When in doubt, call us at (417) 864-8461 and we&apos;ll walk you through it</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/collections/rv-skirts"
            className="inline-flex items-center px-6 py-3 bg-brand-500 text-dark-900 font-semibold rounded-lg hover:bg-brand-400 transition-colors"
          >
            Shop RV Skirts
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Contact Us for Help
          </Link>
        </div>
      </div>
    </div>
  );
}
