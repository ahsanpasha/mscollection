import type { Metadata } from "next";
import { ReturnsPage } from "@/components/content-pages";

export const metadata: Metadata = {
  title: "Returns & Exchange | MS Collection",
  description: "Read our 7-day hassle-free exchange and return policy.",
};

export default function Page() {
  return <ReturnsPage />;
}
