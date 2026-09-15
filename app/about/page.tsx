import type { Metadata } from "next";
import { StoryPage } from "@/components/content-pages";

export const metadata: Metadata = {
  title: "Our Story | MS Collection",
  description: "Discover the craft, philosophy and Pakistani heritage of MS Collection.",
};

export default function Page() {
  return <StoryPage />;
}
