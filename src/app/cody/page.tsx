import type { Metadata } from "next";
import CodyCallHelper from "./CodyCallHelper";

export const metadata: Metadata = {
  title: "Cody Call Helper",
  description: "Internal call intake helper for Springfield Special Products.",
};

export default function CodyPage() {
  return <CodyCallHelper />;
}
