"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ProductGrid } from "@/components/shop";
import { products } from "@/lib/catalog";

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const query = q.trim().toLowerCase();

  const results = query
    ? products.filter((p) =>
        [p.name, p.category, p.collection, p.fabric, p.gender, ...p.colors].some((term) =>
          term.toLowerCase().includes(query)
        )
      )
    : products;

  return (
    <main className="page-shell py-14">
      <div className="mb-10 border-b border-border pb-6">
        <p className="eyebrow">Search Results</p>
        <h1 className="font-display text-4xl md:text-5xl">
          {query ? `Results for “${q}”` : "All Collections"}
        </h1>
        <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          {results.length} pieces found
        </p>
      </div>

      {results.length > 0 ? (
        <ProductGrid items={results} />
      ) : (
        <div className="py-16 text-center">
          <p className="font-display text-3xl">No pieces matched your search</p>
          <p className="mt-3 text-muted-foreground">
            Try searching for terms like &quot;Lawn&quot;, &quot;Kurta&quot;, &quot;Festive&quot;, or &quot;Waistcoat&quot;.
          </p>
        </div>
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="page-shell py-16 text-center">Loading search results...</div>}>
      <SearchContent />
    </Suspense>
  );
}
