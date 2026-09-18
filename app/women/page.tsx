"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CatalogPage } from "@/components/shop";

function WomenContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  // Determine mode based on ?type= query param from hero
  const mode = type === "unstitched" ? "unstitched" : type === "stitched" ? "stitched" : "all";

  return (
    <CatalogPage
      title="Women"
      copy="Quiet refinement, expressive colour and enduring Pakistani silhouettes."
      gender="Women"
      mode={mode}
    />
  );
}

export default function WomenPage() {
  return (
    <Suspense fallback={<div className="py-32 text-center text-sm text-muted-foreground">Loading…</div>}>
      <WomenContent />
    </Suspense>
  );
}
