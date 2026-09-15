import type { Metadata } from "next";
import { CatalogPage } from "@/components/shop";

export const metadata: Metadata = {
  title: "New Arrivals | MS Collection",
  description: "The newest chapter of considered Pakistani dressing.",
};

export default function NewArrivalsPage() {
  return (
    <CatalogPage
      title="New Arrivals"
      copy="The newest chapter of considered Pakistani dressing."
      mode="new"
    />
  );
}
