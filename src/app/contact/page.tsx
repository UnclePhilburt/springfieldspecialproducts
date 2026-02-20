import { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ContactForm from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Springfield Special Products. Call (417) 864-8461 or send us a message.",
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Contact" }]} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-gray-600 mb-8">
            Have a question about our products, need a custom quote, or want to
            schedule a repair? We&apos;re here to help.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-brand-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-900">Address</h3>
                <p className="text-gray-600">
                  2045 N. National Ave<br />
                  Springfield, MO
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-brand-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-900">Phone</h3>
                <a href="tel:4178648461" className="text-brand-700 hover:text-brand-800">
                  (417) 864-8461
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-gray-50 rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Send Us a Message
          </h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
