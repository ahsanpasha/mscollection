import type { Metadata } from "next";
import { CartPage } from "@/components/content-pages";

export const metadata: Metadata = {
  title: "Shopping Bag | MS Collection",
  description: "Review and edit your selected MS Collection pieces.",
};

export default function Page() {
  return <CartPage />;
}
