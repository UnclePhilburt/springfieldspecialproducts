"use client";

import Link from "next/link";
import { useState } from "react";
import { mainNavigation } from "@/data/navigation";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200">
          <span className="text-lg font-bold text-dark-800">Menu</span>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {mainNavigation.map((item) => (
            <div key={item.href}>
              {item.children ? (
                <>
                  <button
                    onClick={() =>
                      setExpandedItem(
                        expandedItem === item.href ? null : item.href
                      )
                    }
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    {item.label}
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        expandedItem === item.href ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedItem === item.href && (
                    <div className="bg-gray-50">
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block px-8 py-2 text-sm text-gray-600 hover:text-brand-600"
                      >
                        View All {item.label}
                      </Link>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className="block px-8 py-2 text-sm text-gray-600 hover:text-brand-600"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 px-4 py-4">
          <a
            href="tel:4178648461"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            (417) 864-8461
          </a>
        </div>
      </div>
    </div>
  );
}
