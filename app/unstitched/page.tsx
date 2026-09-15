import type { Metadata } from "next";
import { CatalogPage } from "@/components/shop";

export const metadata: Metadata = {
  title: "Unstitched Luxury Fabrics | MS Collection",
  description: "Artisanal unstitched fabrics, intricate embroidery and heirloom lawn textiles.",
};

export default function UnstitchedPage() {
  return (
    <CatalogPage
      title="Unstitched"
      copy="Artisanal unstitched fabrics, intricate embroidery and heirloom lawn textiles."
      mode="unstitched"
    />
  );
}
