"use client";

import Link from "next/link";
import { ArrowRight, Compass, Sparkles, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard, SectionTitle } from "@/components/shop";
import { products } from "@/lib/catalog";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"all" | "women" | "men" | "festive">("all");

  const featuredPieces = products.filter((p) => {
    if (activeTab === "women") return p.gender === "Women";
    if (activeTab === "men") return p.gender === "Men";
    if (activeTab === "festive") return p.collection === "Festive" || p.collection === "Heritage";
    return p.featured || p.newArrival;
  });

  const newArrivals = products.filter((p) => p.newArrival).slice(0, 4);

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] items-center justify-center bg-[#161513] text-white md:min-h-[88vh]">
        <img
          src="/assets/editorial-hero.jpg"
          alt="MS Collection Haute Couture"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-75 brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/40" />

        <div className="page-shell relative z-10 py-20 text-center">
          <div className="mx-auto max-w-4xl">
            <span className="mb-5 inline-flex items-center gap-2 border border-white/30 bg-black/45 px-4 py-1.5 text-[11px] uppercase tracking-[0.26em] text-white/95 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-gold" /> MS Collection · Atelier Lahore
            </span>
            <h1 className="font-display text-5xl font-normal leading-[1.06] text-white sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-md">
              Quiet Luxury. Enduring Silhouettes.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
              Thoughtfully crafted Pakistani prêt, regal menswear, and unstitched heirlooms cut from pure lawn, organza and rich jacquards.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild variant="luxury" size="lg" className="bg-white text-black hover:bg-white/90 px-7">
                <Link href="/stitched">Explore Stitched</Link>
              </Button>
              <Button asChild variant="luxury-outline" size="lg" className="border-white text-white hover:bg-white hover:text-black px-7">
                <Link href="/unstitched">Unstitched Luxury</Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="text-white hover:bg-white/15 px-6">
                <Link href="/men" className="flex items-center gap-2">
                  Men&apos;s Atelier <ArrowRight className="h-4 w-4 text-gold" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Boutique Categories Grid (Curated Edits: Stitched, Unstitched, Men) */}
      <section className="page-shell py-16 md:py-24">
        <SectionTitle
          eyebrow="Curated Edits"
          title="The House Portfolios"
          copy="Explore distinct collections cut from breathable lawn, pure silks, fine karandi and artisanal jacquards."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1: Stitched */}
          <Link href="/stitched" className="group relative aspect-[3/4] overflow-hidden bg-secondary transition-all">
            <img
              src="/assets/editorial-heritage.jpg"
              alt="Stitched Ready to Wear Collection"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 text-white">
              <p className="eyebrow text-gold">Ready-to-Wear</p>
              <h3 className="font-display text-3xl">Stitched Prêt</h3>
              <span className="mt-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-white/85 group-hover:text-gold transition-colors">
                Discover Collection <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>

          {/* Card 2: Unstitched */}
          <Link href="/unstitched" className="group relative aspect-[3/4] overflow-hidden bg-secondary transition-all">
            <img
              src="/assets/editorial-hero.jpg"
              alt="Unstitched Luxury Collection"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 text-white">
              <p className="eyebrow text-gold">Handpicked Textiles</p>
              <h3 className="font-display text-3xl">Unstitched Luxury</h3>
              <span className="mt-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-white/85 group-hover:text-gold transition-colors">
                Discover Collection <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>

          {/* Card 3: Men */}
          <Link href="/men" className="group relative aspect-[3/4] overflow-hidden bg-secondary transition-all">
            <img
              src="/assets/editorial-men.jpg"
              alt="Men's Eastern Collection"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 text-white">
              <p className="eyebrow text-gold">Kurtas &amp; Waistcoats</p>
              <h3 className="font-display text-3xl">Men&apos;s Atelier</h3>
              <span className="mt-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-white/85 group-hover:text-gold transition-colors">
                Discover Collection <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Collection Interactive Tabs */}
      <section className="bg-secondary/40 border-y border-border py-16 md:py-24">
        <div className="page-shell">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <p className="eyebrow">Signature Creations</p>
              <h2 className="font-display text-4xl md:text-5xl">Featured Pieces</h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "All Items" },
                { id: "women", label: "Women" },
                { id: "men", label: "Men" },
                { id: "festive", label: "Festive & Formals" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors ${
                    activeTab === tab.id
                      ? "border-b-2 border-primary font-semibold text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
              {featuredPieces.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          <div className="mt-14 text-center">
            <Button asChild variant="luxury-outline" size="lg">
              <Link href="/collections">View Complete Catalog</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Editorial Craftsmanship Highlight */}
      <section className="page-shell py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
            <img
              src="/assets/editorial-heritage.jpg"
              alt="MS Collection Atelier Craftsmanship"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 border border-white/30 bg-black/60 p-5 text-white backdrop-blur-md">
              <p className="eyebrow text-gold">The Atelier Standard</p>
              <p className="font-display text-2xl">Heirloom Embroidery &amp; Pure Textiles</p>
            </div>
          </div>

          <div className="lg:pl-6">
            <p className="eyebrow">Our Philosophy</p>
            <h2 className="font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
              Made with memory. Designed for now.
            </h2>
            <p className="mt-6 leading-7 text-muted-foreground">
              MS Collection is born out of reverence for Pakistani craftsmanship and refined modern silhouettes. We believe garments should possess timeless dignity, impeccable drape, and personal resonance across seasons.
            </p>

            <div className="mt-8 space-y-4 border-t border-border pt-6">
              {[
                { title: "Archival Motifs", desc: "Intricate floral zari, resham threadwork, and hand-finished buttoning." },
                { title: "Artisanal Textiles", desc: "Fine cotton lawn, lustrous jacquards, wash & wear blends, and pure silks." },
                { title: "Tailored Dignity", desc: "Precision collars, structured waistcoats, and fluid dupattas cut to perfection." },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-gold">
                    0{idx + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider">{item.title}</h4>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button asChild variant="luxury" size="lg">
                <Link href="/about">Read Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="bg-secondary/30 border-t border-border py-16 md:py-24">
        <div className="page-shell">
          <SectionTitle
            eyebrow="Fresh From The Atelier"
            title="New Season Arrivals"
            copy="The newest chapter of considered Pakistani dressing for festive occasions and casual refinement."
          />

          <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="luxury-outline" size="lg">
              <Link href="/new-arrivals">Explore All New Arrivals</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Boutique Pillars / Perks */}
      <section className="page-shell py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border border-border p-6 text-center">
            <Truck className="mx-auto h-8 w-8 text-gold" />
            <h3 className="mt-4 font-display text-xl">Complimentary Delivery</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Free nationwide delivery on orders above PKR 10,000 across all Pakistan cities.
            </p>
          </div>

          <div className="border border-border p-6 text-center">
            <RotateCcw className="mx-auto h-8 w-8 text-gold" />
            <h3 className="mt-4 font-display text-xl">Hassle-Free Exchange</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              7-day exchange window with doorstep pickup support for complete peace of mind.
            </p>
          </div>

          <div className="border border-border p-6 text-center">
            <ShieldCheck className="mx-auto h-8 w-8 text-gold" />
            <h3 className="mt-4 font-display text-xl">Atelier Guarantee</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              100% authentic fabrics, heirloom embroidery, and master craftsmanship.
            </p>
          </div>

          <div className="border border-border p-6 text-center">
            <Compass className="mx-auto h-8 w-8 text-gold" />
            <h3 className="mt-4 font-display text-xl">Styling Concierge</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Personalized size guidance and bespoke occasion styling assistance via WhatsApp.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
