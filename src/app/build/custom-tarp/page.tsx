import { Metadata } from "next";
import CustomTarpBuilder from "./CustomTarpBuilder";

export const metadata: Metadata = {
  title: "Build Your Custom Tarp",
  description:
    "Design a custom tarp to your exact dimensions. Drag to resize, pick your options, and get an instant price estimate.",
};

export default function BuildCustomTarpPage() {
  return <CustomTarpBuilder />;
}
