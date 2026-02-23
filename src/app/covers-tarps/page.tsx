import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Covers & Tarps",
  description:
    "Heavy-duty vinyl covers and tarps for stock trailers, flatbeds, dump trucks, and agriculture. Custom built in Springfield, MO.",
};

const tarpTypes = [
  {
    name: "Stock Trailer Covers",
    tagline: "Keep your livestock protected on the road.",
    description:
      "Custom-fit heavy-duty vinyl covers that shield livestock from sun, rain, and wind during transport. Built to your trailer's exact dimensions.",
    image: "/images/StockTrailer.png",
    href: "/quote/stock-trailer-cover",
    cta: "Get a Quote",
  },
  {
    name: "Rollover Tarps",
    tagline: "Cover your load in seconds.",
    description:
      "Heavy-duty vinyl rollover tarps for flatbed and open-top trailers. Cut to fit your frame with heat-welded seams that won't split under pressure.",
    image: "/images/rollovertarp2.jpg",
    href: "/quote/rollover-tarp",
    cta: "Get a Quote",
  },
  {
    name: "Dump Truck Tarps",
    tagline: "Built for the job site.",
    description:
      "Tarps for dump trucks and roll-off containers that handle daily abuse on construction sites. Heavy-gauge vinyl with reinforced edges and grommets.",
    image: "/images/placeholder-collection.svg",
    href: "/quote/dump-truck-tarp",
    cta: "Get a Quote",
  },
  {
    name: "Agriculture Tarps",
    tagline: "Protect what feeds the country.",
    description:
      "Durable vinyl tarps for grain trailers, hay covers, fertilizer buggies, and agricultural equipment. Weather-resistant and built to last season after season.",
    image: "/images/fertilizerbuggy.jpg",
    href: "/quote/agriculture-tarp",
    cta: "Get a Quote",
  },
];

export default function CoversTarpsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Covers & Tarps
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto">
            Industrial-grade vinyl built to take a beating. Tell us what you
            need — we&apos;ll build it.
          </p>
        </div>
      </section>

      {/* Tarp type sections */}
      {tarpTypes.map((type, i) => (
        <ScrollReveal key={type.name}>
          <section
            className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  i % 2 !== 0 ? "lg:[direction:rtl]" : ""
                }`}
              >
                {/* Image */}
                <div className={i % 2 !== 0 ? "lg:[direction:ltr]" : ""}>
                  <div className="aspect-[4/3] relative rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={type.image}
                      alt={type.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={i % 2 !== 0 ? "lg:[direction:ltr]" : ""}>
                  <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">
                    {type.tagline}
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-dark-800">
                    {type.name}
                  </h2>
                  <p className="mt-4 text-gray-600 leading-relaxed">
                    {type.description}
                  </p>
                  <Link
                    href={type.href}
                    className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-brand-500 text-dark-900 font-semibold rounded-lg hover:bg-brand-400 transition-colors"
                  >
                    {type.cta}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>
      ))}

      {/* Bottom CTA */}
      <section className="bg-dark-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            Need something different?
          </h2>
          <p className="text-gray-400 mb-6">
            We build custom tarps to any size and spec.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/build/custom-tarp"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 text-dark-900 font-semibold rounded-lg hover:bg-brand-400 transition-colors"
            >
              Build a Custom Tarp
            </Link>
            <a
              href="tel:4178648461"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
            >
              Call (417) 864-8461
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
