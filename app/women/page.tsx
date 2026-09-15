import type { Metadata } from "next";
import { CatalogPage } from "@/components/shop";

export const metadata: Metadata = {
  title: "Women's Collection | MS Collection",
  description: "Quiet refinement, expressive colour and enduring Pakistani silhouettes.",
};

export default function WomenPage() {
  return (
    <CatalogPage
      title="Women"
      copy="Quiet refinement, expressive colour and enduring Pakistani silhouettes."
      gender="Women"
    />
  );
}
