import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <p className="text-6xl font-extrabold text-brand-500 mb-4">404</p>
      <h1 className="text-2xl font-bold text-dark-800 mb-2">
        Page not found
      </h1>
      <p className="text-gray-600 mb-8">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
        have been moved or no longer exists.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="px-5 py-2.5 bg-brand-500 text-dark-900 font-semibold rounded-lg hover:bg-brand-400 transition-colors text-sm"
        >
          Go Home
        </Link>
        <Link
          href="/collections"
          className="px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors text-sm"
        >
          Browse Products
        </Link>
        <Link
          href="/contact"
          className="px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors text-sm"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
