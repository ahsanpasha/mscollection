import type { Metadata } from "next";
import { TermsPage } from "@/components/content-pages";

export const metadata: Metadata = {
  title: "Terms & Conditions | MS Collection",
  description: "Terms and conditions for purchasing from MS Collection.",
};

export default function Page() {
  return <TermsPage />;
}
