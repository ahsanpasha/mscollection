import type { Metadata } from "next";
import { PrivacyPage } from "@/components/content-pages";

export const metadata: Metadata = {
  title: "Privacy Policy | MS Collection",
  description: "Learn how we safeguard your personal data and respect your privacy.",
};

export default function Page() {
  return <PrivacyPage />;
}
