import Link from "next/link";

interface FormConfirmationProps {
  type: "quote" | "contact" | "repair";
}

export default function FormConfirmation({ type }: FormConfirmationProps) {
  const messages = {
    quote: {
      heading: "Quote Request Received",
      body: "We\u2019ll review your details and get back to you with pricing, usually within 1\u20132 business days.",
    },
    contact: {
      heading: "Message Sent",
      body: "Thanks for reaching out. We\u2019ll get back to you within 1\u20132 business days.",
    },
    repair: {
      heading: "Repair Request Received",
      body: "We\u2019ll review your repair details and get back to you with a quote, usually within 1\u20132 business days.",
    },
  };

  const { heading, body } = messages[type];

  return (
    <div className="text-center py-8">
      <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          className="w-7 h-7 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-dark-800 mb-2">{heading}</h3>
      <p className="text-gray-600 mb-6 max-w-sm mx-auto">{body}</p>
      <p className="text-sm text-gray-500 mb-8">
        Need it sooner? Call us at{" "}
        <a
          href="tel:4178648461"
          className="font-semibold text-brand-600 hover:text-brand-700"
        >
          (417) 864-8461
        </a>
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/collections"
          className="px-5 py-2.5 bg-brand-500 text-dark-900 font-semibold rounded-lg hover:bg-brand-400 transition-colors text-sm"
        >
          Browse Products
        </Link>
        <Link
          href="/"
          className="px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors text-sm"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
