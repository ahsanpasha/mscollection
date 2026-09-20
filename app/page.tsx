"use client";

import Link from "next/link";
import { ArrowRight, Compass, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/shop";
import { ProductCarousel } from "@/components/product-carousel";
import { products } from "@/lib/catalog";

/* ── Hero carousel images - Exact Nishat Style ──────────────────────────── */
const heroSlides = [
  {
    img: "/images/home/womenbanner2.png",
    mobileImg: "/images/home/womenbanner2mobile.png",
    tag: "CROSS SEASON EDIT",
    title: "WOMEN STITCHED",
    cta: { label: "SHOP NOW", href: "/women?type=stitched" },
    mobilePos: "object-[center_5%]",
  },
  {
    img: "/images/home/womenbanner1.png",
    mobileImg: "/images/home/womenbanner1mobile.png",
    tag: "CROSS SEASON EDIT",
    title: "WOMEN UNSTITCHED",
    cta: { label: "SHOP NOW", href: "/women?type=unstitched" },
    mobilePos: "object-[center_5%]",
  },
  {
    img: "/images/home/menbanner.png",
    mobileImg: "/images/home/menbannermobile.png",
    tag: "CROSS SEASON EDIT",
    title: "MEN",
    cta: { label: "SHOP NOW", href: "/men" },
    mobilePos: "object-[center_5%]",
  }
];

export default function HomePage() {
  const [slide, setSlide] = useState(0);
  const [womenTab, setWomenTab] = useState<"all" | "stitched" | "unstitched">("all");

  /* Auto advance hero slide every 6 seconds */
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const handleWomenTabChange = (tab: "all" | "stitched" | "unstitched") => {
    setWomenTab(tab);
  };

  const allWomenProducts = products.filter((p) => p.gender === "Women");
  const filteredWomenProducts = allWomenProducts.filter((p) => {
    if (womenTab === "stitched") return p.isStitched === true;
    if (womenTab === "unstitched") return p.isStitched === false;
    return true;
  });

  const allMenProducts = products.filter((p) => p.gender === "Men");

  const current = heroSlides[slide];

  return (
    <main className="overflow-hidden">

      {/* ── Hero Carousel Section - Exact Nishat Linen Style ──────────────── */}
      <section
        className="relative min-h-[500px] w-full flex items-end justify-start overflow-hidden h-[92vh] md:h-screen"
        style={{ background: "#0a0908" }}
      >
        {/* Carousel Background Images */}
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: i === slide ? 1 : 0, zIndex: i === slide ? 1 : 0 }}
          >
            <picture className="block w-full h-full">
              <source media="(max-width: 767px)" srcSet={s.mobileImg} />
              <img
                src={s.img}
                alt={s.title}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={i === 0 ? "high" : "low"}
                className={`h-full w-full object-cover ${s.mobilePos} md:object-center origin-top md:origin-center transition-transform duration-[7000ms] ease-out ${i === slide ? "scale-105" : "scale-100"
                  }`}
              />
            </picture>
          </div>
        ))}

        {/* Soft dark vignette gradient overlay for text readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Bottom-Left Text Content (Refined Nishat Screenshot Style) */}
        <div className="relative z-20 page-shell pb-8 sm:pb-20 lg:pb-24">
          <div className="max-w-2xl text-left space-y-2">
            {/* Small Eyebrow Tag */}
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-medium text-stone-300 drop-shadow-md">
              {current.tag}
            </p>

            {/* Display Title - Fitted Single Line */}
            <h1 className="font-display text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light text-white uppercase tracking-[0.12em] leading-snug drop-shadow-lg">
              {current.title}
            </h1>

            {/* Action Underline Link */}
            <div className="pt-2">
              <Link
                href={current.cta.href}
                className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-white hover:text-[#dfc187] border-b border-white hover:border-[#dfc187] pb-0.5 transition-all duration-300 group drop-shadow-md"
              >
                <span>{current.cta.label}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Slide Indicators on Bottom Right */}
        <div className="absolute bottom-10 sm:bottom-28 right-6 md:right-14 z-20 flex items-center gap-2.5">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1 transition-all duration-300 rounded-full ${i === slide ? "w-8 bg-[#dfc187]" : "w-2.5 bg-white/40 hover:bg-white"
                }`}
            />
          ))}
        </div>
      </section>


      <section className="py-16 md:py-24" style={{ background: "#ffffff" }}>
        <div className="page-shell">
          <SectionTitle
            eyebrow="Our Collections"
            title="Shop by Category"
            copy="We have stitched and unstitched shalwar kameez for women, and shalwar kameez for men — all available in a variety of fabrics and styles."
          />

          <div className="grid gap-6 md:grid-cols-3">
            <Link href="/women?type=stitched" className="group relative aspect-[3/4] overflow-hidden" style={{ background: "#f4f1ea" }}>
              <img src="/images/home/category1.png" alt="Stitched Shalwar Kameez" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.18) 60%, transparent 100%)" }} />
              <div className="absolute inset-x-6 bottom-6 text-white">
                <p className="eyebrow text-gold">Women's</p>
                <h3 className="font-display text-3xl">Stitched Suits</h3>
                <span className="mt-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-white/80 group-hover:text-gold transition-colors">
                  Shop Now <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>

            <Link href="/women?type=unstitched" className="group relative aspect-[3/4] overflow-hidden" style={{ background: "#f4f1ea" }}>
              <img src="/images/home/category2.png" alt="Unstitched Fabric" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
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
              <img src="/images/home/category3.png" alt="Men's Shalwar Kameez" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
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
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <p className="eyebrow">Women's Collection</p>
              <h2 className="font-display text-4xl md:text-5xl">Women's Shalwar Kameez</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                Beautiful stitched and unstitched suits in lawn, cotton, khaddar and more — for everyday wear and special occasions.
              </p>
            </div>


          </div>

          {/* Wide editorial banner ("Suits for Every Occasion") */}
          <div className="mb-10 relative aspect-[21/9] overflow-hidden hidden md:block">
            <img src="/images/home/women.png" alt="Women's Collection" className="h-full w-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }} />
            <div className="absolute left-10 top-1/2 -translate-y-1/2 text-white max-w-md">
              <p className="eyebrow text-gold">New Arrivals</p>
              <h3 className="font-display text-5xl leading-tight">Suits for Every Occasion</h3>
              <Button asChild variant="luxury" size="lg" className="mt-6" style={{ background: "#fff", color: "#000" }}>
                <Link href={womenTab === "stitched" ? "/women?type=stitched" : womenTab === "unstitched" ? "/women?type=unstitched" : "/women"}>Shop Now</Link>
              </Button>
            </div>
          </div>

          {/* Women's Product Carousel */}
          <ProductCarousel products={filteredWomenProducts} autoPlay autoPlayInterval={5000} />

          {/* Show All Women's Articles Button */}
          <div className="mt-12 text-center">
            <Button asChild variant="luxury-outline" size="lg" className="hover:bg-[#141312] hover:text-white transition-all">
              <Link href={womenTab === "stitched" ? "/women?type=stitched" : womenTab === "unstitched" ? "/women?type=unstitched" : "/women"}>
                Show All Women's Articles &rarr;
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Men's Section ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: "#fcfbf9" }}>
        <div className="page-shell">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="eyebrow">Men's Collection</p>
              <h2 className="font-display text-4xl md:text-5xl">Men's Shalwar Kameez</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                Classic and stylish shalwar kameez for men in quality fabrics — great for daily wear, Eid and special events.
              </p>
            </div>
          </div>

          {/* Wide editorial banner */}
          <div className="mb-10 relative aspect-[21/9] overflow-hidden hidden md:block">
            <img src="/images/home/men.png" alt="Men's Collection" className="h-full w-full object-cover" style={{ filter: "brightness(0.88)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 65%, transparent 100%)" }} />
            <div className="absolute left-10 top-1/2 -translate-y-1/2 text-white max-w-md">
              <p className="eyebrow text-gold">Men's Wear</p>
              <h3 className="font-display text-5xl leading-tight">Style &amp; Comfort<br />in Every Suit</h3>
              <Button asChild size="lg" className="mt-6" variant="luxury" style={{ background: "#fff", color: "#000" }}>
                <Link href="/men">Shop Now</Link>
              </Button>
            </div>
          </div>

          {/* Men's Product Carousel */}
          <ProductCarousel products={allMenProducts} autoPlay autoPlayInterval={6000} />

          {/* Show All Men's Articles Button */}
          <div className="mt-12 text-center">
            <Button asChild variant="luxury-outline" size="lg" className="hover:bg-[#141312] hover:text-white transition-all">
              <Link href="/men">
                Show All Men's Articles &rarr;
              </Link>
            </Button>
          </div>
        </div>
      </section>


      {/* ── About Section ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: "#ffffff" }}>
        <div className="page-shell">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
              <img src="/images/home/category1.png" alt="MS Collection Quality" className="h-full w-full object-cover" />
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
