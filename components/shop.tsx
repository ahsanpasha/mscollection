"use client";

import Link from "next/link";
import { ChevronDown, SlidersHorizontal, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";
import { formatPrice, products, type Product } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export function SectionTitle({ eyebrow, title, copy }: { eyebrow?: string; title: string; copy?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="font-display text-4xl leading-tight md:text-5xl lg:text-6xl">{title}</h2>
      {copy && <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">{copy}</p>}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { addToBag } = useStore();
  const [added, setAdded] = useState(false);

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.isStitched ? (product.sizes[0] || "M") : "Unstitched Fabric";
    addToBag(product, product.colors[0] || "", defaultSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <article className="product-card group min-w-0">
      <Link href={`/product/${product.id}`} className="block">
        {/* Image container with taller luxury portrait aspect ratio */}
        <div className="relative aspect-[2/3] overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            width={400}
            height={600}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Luxury Discount Sale Badge */}
          {discountPercent && (
            <span className="absolute top-2.5 right-2.5 z-10 bg-[#dfc187] text-[#141312] text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 shadow-md">
              {discountPercent}% OFF
            </span>
          )}

          {/* Bottom subtle bar on hover */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-between text-white text-xs tracking-wider uppercase">
            <span>View Details</span>
            <span>&rarr;</span>
          </div>
        </div>

        {/* Product meta info */}
        <div className="pt-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[.18em] text-muted-foreground">
                {product.collection} · {product.category}
              </p>
              <h3 className="mt-1 font-display text-xl leading-tight text-foreground transition-colors group-hover:text-gold truncate">
                {product.name}
              </h3>
            </div>
          </div>

          <div className="mt-2 flex items-baseline gap-2 text-sm flex-wrap">
            <span className="font-semibold text-foreground">{formatPrice(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                {discountPercent && (
                  <span className="text-[10px] font-bold text-[#141312] bg-[#dfc187] px-1.5 py-0.5 uppercase tracking-wider">
                    {discountPercent}% OFF
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </Link>

      {/* Quick Add to Bag Button */}
      <div className="mt-3">
        <button
          type="button"
          onClick={handleQuickAdd}
          className={`w-full py-2 px-3 text-[10px] uppercase tracking-[0.16em] font-semibold transition-all duration-300 border flex items-center justify-center gap-1.5 cursor-pointer ${added
            ? "bg-[#25D366] border-[#25D366] text-white"
            : "bg-secondary/60 border-border text-foreground hover:bg-[#141312] hover:text-white hover:border-[#141312]"
            }`}
        >
          <ShoppingBag className="h-3 w-3" />
          <span>{added ? "Added to Bag ✓" : "Add to Bag"}</span>
        </button>
      </div>
    </article>
  );
}

export function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
      {items.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export function CatalogPage({
  title,
  copy,
  gender,
  mode = "all",
  initialCategory = "all",
}: {
  title: string;
  copy: string;
  gender?: "Women" | "Men" | string;
  mode?: string;
  initialCategory?: string;
}) {
  const [cat, setCat] = useState(initialCategory);
  const [sort, setSort] = useState("featured");

  const list = useMemo(() => {
    return products
      .filter((p) => (gender ? p.gender === gender : true))
      .filter((p) => {
        if (mode === "new") return !!p.newArrival;
        if (mode === "sale") return !!p.originalPrice;
        if (mode === "stitched") return p.isStitched === true || (p.gender === "Women" && typeof p.unstitchedPrice === "number");
        if (mode === "unstitched") return p.isStitched === false || (p.gender === "Women" && typeof p.unstitchedPrice === "number");
        return true;
      })
      .map((p) => {
        if (mode === "unstitched" && p.gender === "Women" && typeof p.unstitchedPrice === "number") {
          // Keep same discount % as stitched:
          // unstitchedOriginal = unstitchedPrice × (stitchedOriginal / stitchedPrice)
          const unstitchedOriginal =
            p.originalPrice && p.price && p.price > 0
              ? Math.round((p.unstitchedPrice * p.originalPrice) / p.price / 100) * 100
              : undefined;
          return { ...p, price: p.unstitchedPrice, originalPrice: unstitchedOriginal };
        }
        return p;
      })
      .filter((p) => {
        if (cat === "all") return true;
        return p.category.toLowerCase().includes(cat.toLowerCase()) || p.collection.toLowerCase().includes(cat.toLowerCase());
      })
      .sort((a, b) => {
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        return (b.popular || 0) - (a.popular || 0);
      });
  }, [gender, mode, cat, sort]);

  const categories = gender === "Men"
    ? ["all"]
    : ["all", "2 Piece", "3 Piece"];

  return (
    <main>
      <div className="editorial-banner">
        <div>
          <p className="eyebrow">MS Collection</p>
          <h1>{title}</h1>
          <p>{copy}</p>
        </div>
      </div>

      <div className="page-shell py-12">
        {/* Filter bar */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors ${cat === c
                  ? "border-b-2 border-primary font-semibold text-primary"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {c === "all" ? "All Articles" : c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              {list.length} Articles
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort products"
              className="border border-border bg-background px-3 py-1.5 text-xs uppercase tracking-wider outline-none"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {list.length ? (
          <ProductGrid items={list} />
        ) : (
          <div className="py-20 text-center">
            <h3 className="font-display text-3xl">No articles found</h3>
            <p className="mt-2 text-sm text-muted-foreground">Try selecting a different category filter.</p>
          </div>
        )}
      </div>
    </main>
  );
}
