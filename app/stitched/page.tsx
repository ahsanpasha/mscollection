import type { Metadata } from "next";
import { CatalogPage } from "@/components/shop";

export const metadata: Metadata = {
  title: "Stitched Ready-to-Wear | MS Collection",
  description: "Impeccably tailored prêt silhouettes ready for every celebration.",
};

export default function StitchedPage() {
  return (
    <CatalogPage
      title="Stitched"
      copy="Impeccably tailored prêt silhouettes ready for every celebration."
      mode="stitched"
    />
  );
}
