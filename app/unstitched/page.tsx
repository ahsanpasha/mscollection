import type { Metadata } from "next";
import { CatalogPage } from "@/components/shop";

export const metadata: Metadata = {
  title: "Unstitched Luxury Fabrics | MS Collection",
  description: "Artisanal unstitched fabrics, intricate embroidery and heirloom lawn textiles.",
};

export default function UnstitchedPage() {
  return (
    <CatalogPage
      title="Women Unstitched"
      copy="Artisanal unstitched fabrics, intricate embroidery and heirloom lawn textiles."
      gender="Women"
      mode="unstitched"
    />
  );
}
