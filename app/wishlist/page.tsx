import type { Metadata } from "next";
import { WishlistPage } from "@/components/content-pages";

export const metadata: Metadata = {
  title: "Wishlist | MS Collection",
  description: "A considered edit of the pieces you love.",
};

export default function Page() {
  return <WishlistPage />;
}
