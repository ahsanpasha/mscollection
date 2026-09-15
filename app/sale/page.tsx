import type { Metadata } from "next";
import { CatalogPage } from "@/components/shop";

export const metadata: Metadata = {
  title: "Sale Edit | MS Collection",
  description: "Special pricing on selected archival pieces and seasonal favorites.",
};

export default function SalePage() {
  return (
    <CatalogPage
      title="Sale"
      copy="Special pricing on selected archival pieces and seasonal favorites."
      mode="sale"
    />
  );
}
