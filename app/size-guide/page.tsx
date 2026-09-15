import type { Metadata } from "next";
import { SizeGuidePage } from "@/components/content-pages";

export const metadata: Metadata = {
  title: "Size Guide | MS Collection",
  description: "Find your exact fit with our comprehensive women and men sizing chart.",
};

export default function Page() {
  return <SizeGuidePage />;
}
