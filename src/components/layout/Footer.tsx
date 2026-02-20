import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark-800 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <h3 className="text-brand-400 font-bold text-lg mb-4">
              Springfield Special Products
            </h3>
            <address className="not-italic text-sm space-y-1">
              <p>2045 N. National Ave</p>
              <p>Springfield, MO</p>
              <p>
                <a href="tel:4178648461" className="hover:text-brand-400 transition-colors">
                  (417) 864-8461
                </a>
              </p>
            </address>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Products
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/collections/ratchet-straps" className="hover:text-brand-400 transition-colors">
                  Ratchet Straps
                </Link>
              </li>
              <li>
                <Link href="/collections/rv-skirts" className="hover:text-brand-400 transition-colors">
                  RV Skirts
                </Link>
              </li>
              <li>
                <Link href="/collections/trailer-covers" className="hover:text-brand-400 transition-colors">
                  Trailer Covers
                </Link>
              </li>
              <li>
                <Link href="/collections/custom-tarps" className="hover:text-brand-400 transition-colors">
                  Custom Tarps
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-brand-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/repairs" className="hover:text-brand-400 transition-colors">
                  Repairs
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/guides/rv-measuring" className="hover:text-brand-400 transition-colors">
                  RV Measuring Guide
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-brand-400 transition-colors">
                  All Collections
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-dark-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Springfield Special Products. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Square</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
