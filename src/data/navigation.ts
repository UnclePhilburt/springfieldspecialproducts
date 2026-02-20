import { NavigationItem } from "@/lib/types";

export const mainNavigation: NavigationItem[] = [
  {
    label: "RV Skirts",
    href: "/build/rv-skirt",
    children: [
      { label: "Build Your RV Skirt", href: "/build/rv-skirt" },
      { label: "Measuring Guide", href: "/guides/rv-measuring" },
    ],
  },
  {
    label: "Trailer Covers",
    href: "/collections/trailer-covers",
    children: [
      { label: "Stock Trailer Covers", href: "/quote/stock-trailer-cover" },
      { label: "Rollover Tarps", href: "/quote/rollover-tarp" },
      { label: "Dump Truck Tarps", href: "/quote/dump-truck-tarp" },
      { label: "Agriculture Tarps", href: "/quote/agriculture-tarp" },
    ],
  },
  {
    label: "Custom Tarps",
    href: "/build/custom-tarp",
  },
  {
    label: "Safety Foam Mats",
    href: "/quote/safety-foam-mat",
  },
  {
    label: "Repairs",
    href: "/repairs",
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];
