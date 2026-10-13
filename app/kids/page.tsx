import type { Metadata } from "next";
import { CatalogPage } from "@/components/shop";

export const metadata: Metadata = {
  title: "Kids' Collection | MS Collection",
  description: "Charming festive frocks, party dresses and occasion wear tailored for little ones.",
};

export default function KidsPage() {
  return (
    <CatalogPage
      title="Kids"
      copy="Charming festive frocks, party dresses and elegant craftsmanship tailored for little ones."
      gender="Kids"
    />
  );
}
