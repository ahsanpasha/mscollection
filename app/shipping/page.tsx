import type { Metadata } from "next";
import { ShippingPage } from "@/components/content-pages";

export const metadata: Metadata = {
  title: "Shipping & Delivery | MS Collection",
  description: "Learn about domestic Pakistan delivery timelines, rates and international shipping.",
};

export default function Page() {
  return <ShippingPage />;
}
