import Link from "next/link";
import Image from "next/image";
import { getFeaturedCollections } from "@/data/collections";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function HomePage() {
  const featuredCollections = getFeaturedCollections();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-dark-800 text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/welder.jpg"
            alt=""
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="flex items-center justify-between gap-12">
            {/* Left: Text */}
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-3xl">
                Premium Custom{" "}
                <span className="text-brand-400">Heavy-Duty</span>{" "}
                Vinyl Products
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl">
                RV skirts, trailer covers, and custom tarps — built to last
                in Springfield, Missouri.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/collections"
                  className="inline-flex items-center px-6 py-3 bg-brand-500 text-dark-900 font-semibold rounded-lg hover:bg-brand-400 transition-colors"
                >
                  Shop All Products
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
                >
                  Get a Quote
                </Link>
              </div>
            </div>

            {/* Right: Logo */}
            <div className="hidden lg:block flex-shrink-0">
              <Image
                src="/images/logo.svg"
                alt="Springfield Special Products logo"
                width={300}
                height={300}
                className="opacity-90"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Water Blob Banner */}
      <section className="bg-blue-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <p className="text-sm text-blue-800">
            Looking for <strong>The Water Blob</strong>?
          </p>
          <a
            href="https://thewaterblob.com"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors flex items-center gap-1"
          >
            Visit thewaterblob.com
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-dark-800 mb-8">
            Shop by Category
          </h2>
        </ScrollReveal>
        <ScrollReveal stagger>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCollections.map((collection) => (
              <Link
                key={collection.id}
                href={collection.href || `/collections/${collection.slug}`}
                className="fade-in-up group relative overflow-hidden rounded-xl bg-brand-50 border border-brand-100 hover:shadow-lg hover:border-brand-300 transition-all"
              >
                <div className="aspect-[3/2] relative">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-dark-800 group-hover:text-brand-700 transition-colors">
                    {collection.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {collection.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Trust / Value Props */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ScrollReveal stagger>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="fade-in-up">
              <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-brand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-dark-800">Built to Last</h3>
              <p className="mt-2 text-sm text-gray-600">
                Heavy-duty 18-22 oz vinyl with heat-welded seams for maximum durability.
              </p>
            </div>
            <div className="fade-in-up">
              <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-brand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-dark-800">Made in Missouri</h3>
              <p className="mt-2 text-sm text-gray-600">
                Manufactured in Springfield, MO.
              </p>
            </div>
            <div className="fade-in-up">
              <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-brand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-dark-800">Expert Support</h3>
              <p className="mt-2 text-sm text-gray-600">
                Call us at (417) 864-8461 for custom quotes and product guidance.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Military Support */}
      <ScrollReveal>
      <section className="relative bg-dark-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(255,255,255,0.3) 49px, rgba(255,255,255,0.3) 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(255,255,255,0.3) 49px, rgba(255,255,255,0.3) 50px)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-500/20 border border-brand-500/40 rounded text-xs font-bold tracking-wider text-brand-400 uppercase">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  USA-Made
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 border border-blue-500/40 rounded text-xs font-bold tracking-wider text-blue-400 uppercase">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Military Supply
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/40 rounded text-xs font-bold tracking-wider text-green-400 uppercase">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} />
                  </svg>
                  Field Tested
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Supporting{" "}
                <span className="text-brand-400">U.S. Service Members</span>
              </h2>
              <p className="mt-4 text-gray-400 max-w-xl leading-relaxed">
                We manufacture heavy-duty vinyl tarps and covers trusted by military
                buyers across the nation. Every product is cut, welded, and inspected
                right here in Missouri — built for extreme durability, UV resistance,
                and cold-weather performance.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/quote/military"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 text-dark-900 font-semibold rounded-lg hover:bg-brand-400 transition-colors"
                >
                  Request a Military Quote
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>

              <p className="mt-4 text-xs text-gray-500">
                Products supplied to authorized military purchasers. No Department of Defense endorsement implied.
              </p>
            </div>

            <div className="hidden lg:grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                <div className="text-2xl mb-3">&#9889;</div>
                <h3 className="text-sm font-bold text-white tracking-wide uppercase">Field Durable</h3>
                <p className="mt-1 text-xs text-gray-500">Built for extreme conditions</p>
                <div className="mt-3 flex flex-col gap-1.5">
                  <div className="h-1 bg-brand-500 rounded-full" style={{ width: "100%" }} />
                  <div className="h-1 bg-brand-500/70 rounded-full" style={{ width: "95%" }} />
                  <div className="h-1 bg-brand-500/50 rounded-full" style={{ width: "98%" }} />
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                <div className="text-2xl mb-3">&#9748;</div>
                <h3 className="text-sm font-bold text-white tracking-wide uppercase">UV Protected</h3>
                <p className="mt-1 text-xs text-gray-500">Long-lasting performance</p>
                <div className="mt-3 flex flex-col gap-1.5">
                  <div className="h-1 bg-brand-500 rounded-full" style={{ width: "100%" }} />
                  <div className="h-1 bg-brand-500/70 rounded-full" style={{ width: "92%" }} />
                  <div className="h-1 bg-brand-500/50 rounded-full" style={{ width: "97%" }} />
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                <div className="text-2xl mb-3">&#10052;</div>
                <h3 className="text-sm font-bold text-white tracking-wide uppercase">Cold Resistant</h3>
                <p className="mt-1 text-xs text-gray-500">All-weather ready</p>
                <div className="mt-3 flex flex-col gap-1.5">
                  <div className="h-1 bg-brand-500 rounded-full" style={{ width: "98%" }} />
                  <div className="h-1 bg-brand-500/70 rounded-full" style={{ width: "100%" }} />
                  <div className="h-1 bg-brand-500/50 rounded-full" style={{ width: "96%" }} />
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                <div className="text-2xl mb-3">&#127482;&#127480;</div>
                <h3 className="text-sm font-bold text-white tracking-wide uppercase">Missouri Made</h3>
                <p className="mt-1 text-xs text-gray-500">100% American</p>
                <div className="mt-3 flex flex-col gap-1.5">
                  <div className="h-1 bg-brand-500 rounded-full" style={{ width: "100%" }} />
                  <div className="h-1 bg-brand-500/70 rounded-full" style={{ width: "100%" }} />
                  <div className="h-1 bg-brand-500/50 rounded-full" style={{ width: "100%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Repairs CTA */}
      <ScrollReveal>
      <section className="bg-dark-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold">Need a Repair?</h2>
            <p className="mt-2 text-gray-400">
              We repair tarps, covers, straps, and vinyl products. Get a free quote.
            </p>
          </div>
          <Link
            href="/repairs"
            className="inline-flex items-center px-6 py-3 bg-brand-500 text-dark-900 font-semibold rounded-lg hover:bg-brand-400 transition-colors whitespace-nowrap"
          >
            Request a Repair Quote
          </Link>
        </div>
      </section>
      </ScrollReveal>
    </>
  );
}
