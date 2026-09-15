import type { Metadata } from "next";
import { AccountPage } from "@/components/content-pages";

export const metadata: Metadata = {
  title: "Your Account | MS Collection",
  description: "Sign in to view your orders, saved addresses and personal edit.",
};

export default function Page() {
  return <AccountPage />;
}
