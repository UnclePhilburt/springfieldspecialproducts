import Link from "next/link";
import Image from "next/image";
import { getFeaturedCollections } from "@/data/collections";

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
        <h2 className="text-2xl sm:text-3xl font-bold text-dark-800 mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCollections.map((collection) => (
            <Link
              key={collection.id}
              href={collection.href || `/collections/${collection.slug}`}
              className="group relative overflow-hidden rounded-xl bg-brand-50 border border-brand-100 hover:shadow-lg hover:border-brand-300 transition-all"
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
      </section>

      {/* Trust / Value Props */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
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
          <div>
            <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-brand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-dark-800">Made in Missouri</h3>
            <p className="mt-2 text-sm text-gray-600">
              Manufactured in Springfield, MO with American-made materials.
            </p>
          </div>
          <div>
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
      </section>

      {/* Repairs CTA */}
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
    </>
  );
}
