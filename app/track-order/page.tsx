import type { Metadata } from "next";
import { TrackOrderPage } from "@/components/content-pages";

export const metadata: Metadata = {
  title: "Track Your Order | MS Collection",
  description: "Check the current dispatch and delivery status of your MS Collection order.",
};

export default function Page() {
  return <TrackOrderPage />;
}
