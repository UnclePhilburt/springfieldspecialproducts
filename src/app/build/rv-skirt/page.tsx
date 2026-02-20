import { Metadata } from "next";
import RVSkirtBuilder from "./RVSkirtBuilder";

export const metadata: Metadata = {
  title: "Build Your RV Skirt",
  description:
    "Configure and order a custom RV skirt. Choose your RV type, measurements, and color for a perfect fit.",
};

export default function BuildRVSkirtPage() {
  return <RVSkirtBuilder />;
}
