import type { Metadata } from "next";
import { CheckoutPage } from "@/components/content-pages";

export const metadata: Metadata = {
  title: "Checkout | MS Collection",
  description: "Secure delivery and payment for your MS Collection order.",
};

export default function Page() {
  return <CheckoutPage />;
}
