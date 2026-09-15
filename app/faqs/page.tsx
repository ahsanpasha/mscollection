import type { Metadata } from "next";
import { FaqsPage } from "@/components/content-pages";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | MS Collection",
  description: "Find answers to questions on orders, fabrics, delivery times, and exchanges.",
};

export default function Page() {
  return <FaqsPage />;
}
