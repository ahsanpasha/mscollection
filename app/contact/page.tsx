import type { Metadata } from "next";
import { ContactPage } from "@/components/content-pages";

export const metadata: Metadata = {
  title: "Contact Client Services | MS Collection",
  description: "Get in touch with the MS Collection concierge and atelier.",
};

export default function Page() {
  return <ContactPage />;
}
