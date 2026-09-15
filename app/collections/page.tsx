import type { Metadata } from "next";
import { CollectionsPage } from "@/components/content-pages";

export const metadata: Metadata = {
  title: "Collections | MS Collection",
  description: "Seasonal stories rooted in craft, colour and the quiet confidence of Pakistani dress.",
};

export default function Page() {
  return <CollectionsPage />;
}
