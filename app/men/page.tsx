import type { Metadata } from "next";
import { CatalogPage } from "@/components/shop";

export const metadata: Metadata = {
  title: "Men's Collection | MS Collection",
  description: "Impeccable tailoring and understated detail for modern Pakistani menswear.",
};

export default function MenPage() {
  return (
    <CatalogPage
      title="Men"
      copy="Impeccable tailoring and understated detail for modern Pakistani menswear."
      gender="Men"
    />
  );
}
