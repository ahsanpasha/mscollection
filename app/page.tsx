"use client";

import Link from "next/link";
import { ArrowRight, Compass, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard, SectionTitle } from "@/components/shop";
import { products } from "@/lib/catalog";

/* ── Hero carousel images ──────────────────────────────────────────────── */
const heroSlides = [
  {
    img: "/assets/editorial-hero.jpg",
    tag: "New Collection",
    heading: "Women's Shalwar Kameez",
    sub: "Beautiful stitched and unstitched suits for every occasion — casual, formal and festive.",
    cta: { label: "Shop Women", href: "/women" },
  },
  {
    img: "/assets/editorial-heritage.jpg",
    tag: "Stitched Suits",
    heading: "Ready to Wear",
    sub: "Fully stitched shalwar kameez in premium fabrics. Just pick your size and you're ready.",
    cta: { label: "Shop Stitched", href: "/stitched" },
  },
  {
    img: "/assets/editorial-men.jpg",
    tag: "Men's Collection",
    heading: "Men's Shalwar Kameez",
    sub: "Classic and modern shalwar kameez for men — perfect for everyday wear and special occasions.",
    cta: { label: "Shop Men", href: "/men" },
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"all" | "women" | "men" | "festive">("all");
  const [slide, setSlide] = useState(0);

  /* Auto advance every 4 seconds */
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 4000);
    return () => clearInterval(t);
  }, []);

  const featuredPieces = products.filter((p) => {
    if (activeTab === "women") return p.gender === "Women";
    if (activeTab === "men") return p.gender === "Men";
    if (activeTab === "festive") return p.collection === "Festive";
    return p.featured || p.newArrival;
  });

  const womenPieces = products.filter((p) => p.gender === "Women").slice(0, 4);
  const menPieces = products.filter((p) => p.gender === "Men" && p.category === "Shalwar Kameez").slice(0, 4);
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 4);

  const current = heroSlides[slide];

  return (
    <main className="overflow-hidden">

      {/* ── Hero Carousel ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden" style={{ background: "#161513" }}>
        {/* Slides */}
        {heroSlides.map((s, i) => (
          <img
            key={i}
            src={s.img}
            alt={s.heading}
            className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000"
            style={{ opacity: i === slide ? 0.72 : 0, zIndex: i === slide ? 1 : 0 }}
          />
        ))}
        {/* Gradient overlay */}
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.4) 100%)" }} />

        {/* Text content */}
        <div className="page-shell relative z-20 py-24 text-center">
          <div className="mx-auto max-w-4xl">
            <span className="mb-5 inline-flex items-center gap-2 border border-white/30 px-4 py-1.5 text-[11px] uppercase tracking-[0.26em] text-white/95 transition-all duration-700" style={{ background: "rgba(0,0,0,0.45)" }}>
              MS Collection · {current.tag}
            </span>
            <h1 className="font-display text-5xl font-normal leading-[1.06] text-white transition-all duration-700 sm:text-6xl md:text-7xl lg:text-8xl">
              {current.heading}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/90 transition-all duration-700 sm:text-lg">
              {current.sub}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild variant="luxury" size="lg" className="px-8" style={{ background: "#fff", color: "#000" }}>
                <Link href={current.cta.href}>{current.cta.label}</Link>
              </Button>
              <Button asChild variant="luxury-outline" size="lg" className="px-8 border-white text-white hover:bg-white hover:text-black">
                <Link href="/collections" className="flex items-center gap-2">
                  All Collections <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              aria-label={`Slide ${i + 1}`}
              className="h-2 rounded-full transition-all duration-300"
              style={{ width: i === slide ? "28px" : "8px", background: i === slide ? "#fff" : "rgba(255,255,255,0.4)" }}
            />
          ))}
        </div>
      </section>

      {/* ── Shop by Category ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: "#ffffff" }}>
        <div className="page-shell">
        <SectionTitle
          eyebrow="Our Collections"
          title="Shop by Category"
          copy="We have stitched and unstitched shalwar kameez for women, and shalwar kameez for men — all available in a variety of fabrics and styles."
        />

        <div className="grid gap-6 md:grid-cols-3">
          <Link href="/stitched" className="group relative aspect-[3/4] overflow-hidden" style={{ background: "#f4f1ea" }}>
            <img src="/assets/editorial-heritage.jpg" alt="Stitched Shalwar Kameez" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.18) 60%, transparent 100%)" }} />
            <div className="absolute inset-x-6 bottom-6 text-white">
              <p className="eyebrow text-gold">Women's</p>
              <h3 className="font-display text-3xl">Stitched Suits</h3>
              <span className="mt-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-white/80 group-hover:text-gold transition-colors">
                Shop Now <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>

          <Link href="/unstitched" className="group relative aspect-[3/4] overflow-hidden" style={{ background: "#f4f1ea" }}>
            <img src="/assets/editorial-hero.jpg" alt="Unstitched Fabric" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.18) 60%, transparent 100%)" }} />
            <div className="absolute inset-x-6 bottom-6 text-white">
              <p className="eyebrow text-gold">Women's</p>
              <h3 className="font-display text-3xl">Unstitched Fabric</h3>
              <span className="mt-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-white/80 group-hover:text-gold transition-colors">
                Shop Now <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>

          <Link href="/men" className="group relative aspect-[3/4] overflow-hidden" style={{ background: "#f4f1ea" }}>
            <img src="/assets/editorial-men.jpg" alt="Men's Shalwar Kameez" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.18) 60%, transparent 100%)" }} />
            <div className="absolute inset-x-6 bottom-6 text-white">
              <p className="eyebrow text-gold">Men's</p>
              <h3 className="font-display text-3xl">Shalwar Kameez</h3>
              <span className="mt-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-white/80 group-hover:text-gold transition-colors">
                Shop Now <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        </div>
        </div>
      </section>

      {/* ── Women's Section ───────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: "#ffffff" }}>
        <div className="page-shell">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="eyebrow">Women's Collection</p>
              <h2 className="font-display text-4xl md:text-5xl">Women's Shalwar Kameez</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                Beautiful stitched and unstitched suits in lawn, cotton, silk and more — for everyday wear and special occasions.
              </p>
            </div>
            <Button asChild variant="luxury-outline" size="lg">
              <Link href="/women">Shop Women</Link>
            </Button>
          </div>

          {/* Wide editorial banner */}
          <div className="mb-10 relative aspect-[21/9] overflow-hidden hidden md:block">
            <img src="/assets/editorial-heritage.jpg" alt="Women's Collection" className="h-full w-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }} />
            <div className="absolute left-10 top-1/2 -translate-y-1/2 text-white max-w-md">
              <p className="eyebrow text-gold">New Arrivals</p>
              <h3 className="font-display text-5xl leading-tight">Suits for Every Occasion</h3>
              <Button asChild variant="luxury" size="lg" className="mt-6" style={{ background: "#fff", color: "#000" }}>
                <Link href="/women">Shop Now</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
            {womenPieces.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── Men's Section ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: "#ffffff" }}>
        <div className="page-shell">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="eyebrow">Men's Collection</p>
              <h2 className="font-display text-4xl md:text-5xl">Men's Shalwar Kameez</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                Classic and stylish shalwar kameez for men in quality fabrics — great for daily wear, Eid and special events.
              </p>
            </div>
            <Button asChild variant="luxury-outline" size="lg">
              <Link href="/men">Shop Men</Link>
            </Button>
          </div>

          {/* Wide editorial banner */}
          <div className="mb-10 relative aspect-[21/9] overflow-hidden hidden md:block">
            <img src="/assets/editorial-men.jpg" alt="Men's Collection" className="h-full w-full object-cover" style={{ filter: "brightness(0.88)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 65%, transparent 100%)" }} />
            <div className="absolute left-10 top-1/2 -translate-y-1/2 text-white max-w-md">
              <p className="eyebrow text-gold">Men's Wear</p>
              <h3 className="font-display text-5xl leading-tight">Style &amp; Comfort<br />in Every Suit</h3>
              <Button asChild size="lg" className="mt-6" variant="luxury" style={{ background: "#fff", color: "#000" }}>
                <Link href="/men">Shop Now</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
            {menPieces.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: "#ffffff" }}>
        <div className="page-shell">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <p className="eyebrow">Top Picks</p>
              <h2 className="font-display text-4xl md:text-5xl">Featured Products</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "All" },
                { id: "women", label: "Women" },
                { id: "men", label: "Men" },
                { id: "festive", label: "Festive" },
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

          <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
            {featuredPieces.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>

          <div className="mt-14 text-center">
            <Button asChild variant="luxury-outline" size="lg">
              <Link href="/collections">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── About Section ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: "#ffffff" }}>
        <div className="page-shell">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
            <img src="/assets/editorial-heritage.jpg" alt="MS Collection Quality" className="h-full w-full object-cover" />
            <div className="absolute bottom-6 left-6 right-6 border border-white/30 bg-black/60 p-5 text-white" style={{ backdropFilter: "blur(8px)" }}>
              <p className="eyebrow text-gold">Our Promise</p>
              <p className="font-display text-2xl">Quality Fabrics, Beautiful Work</p>
            </div>
          </div>

          <div className="lg:pl-6">
            <p className="eyebrow">Our Story</p>
            <h2 className="font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
              Made with care. Worn with pride.
            </h2>
            <p className="mt-6 leading-7 text-muted-foreground">
              MS Collection started with one simple goal — to offer beautiful, well-made shalwar kameez that you can trust. We carefully select our fabrics and make sure every suit is stitched properly, so you look and feel great every time you wear it.
            </p>
            <div className="mt-8 space-y-4 border-t border-border pt-6">
              {[
                { title: "Quality Fabrics", desc: "We use lawn, cotton, silk and other good quality materials in all our suits." },
                { title: "Good Stitching", desc: "Every suit is stitched neatly and checked before it is sent to you." },
                { title: "For Everyone", desc: "We have clothes for women and men — for daily wear and special occasions." },
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
                <Link href="/about">Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ── New Arrivals ───────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: "#ffffff" }}>
        <div className="page-shell">
          <SectionTitle
            eyebrow="Just Added"
            title="New Arrivals"
            copy="The latest suits just added to our collection — fresh styles for this season."
          />
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
            {newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="luxury-outline" size="lg">
              <Link href="/new-arrivals">See All New Arrivals</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Trust Pillars ───────────────────────────────────────────────────── */}
      <section className="py-16" style={{ background: "#ffffff" }}>
        <div className="page-shell">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { Icon: Truck, title: "Free Delivery", desc: "Free delivery across Pakistan on orders over PKR 10,000." },
            { Icon: RotateCcw, title: "Easy Exchange", desc: "7-day exchange with home pickup if you need a different size." },
            { Icon: ShieldCheck, title: "Genuine Quality", desc: "100% original fabrics and proper stitching — guaranteed." },
            { Icon: Compass, title: "WhatsApp Support", desc: "Need help? Chat with us on WhatsApp — we reply fast." },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="border border-border p-6 text-center">
              <Icon className="mx-auto h-8 w-8 text-gold" />
              <h3 className="mt-4 font-display text-xl">{title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
        </div>
      </section>
    </main>
  );
}
