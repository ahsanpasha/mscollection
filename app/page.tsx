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
    img: "/assets/02.png",
    tag: "New Collection",
    heading: "Women's Shalwar Kameez",
    sub: "Beautiful stitched and unstitched suits for every occasion — casual, formal and festive.",
    cta: { label: "Shop Women", href: "/women" },
  },
  {
    img: "/assets/04  .png",
    tag: "Stitched Suits",
    heading: "Ready to Wear",
    sub: "Fully stitched shalwar kameez in premium fabrics. Just pick your size and you're ready.",
    cta: { label: "Shop Stitched", href: "/stitched" },
  },
  {
    img: "/assets/03.png",
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
                  className={`px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors ${activeTab === tab.id
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

      {/* ── Testimonials ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: "#141312" }}>
        <div className="page-shell">
          <div className="text-center mb-14">
            <p className="eyebrow" style={{ color: "#b8975a" }}>Customer Love</p>
            <h2 className="font-display text-4xl md:text-5xl mt-2" style={{ color: "#f7f6f2" }}>
              What Our Customers Say
            </h2>
            <p className="mt-4 text-sm leading-7 max-w-xl mx-auto" style={{ color: "#9c9a92" }}>
              Thousands of happy customers across Pakistan trust MS Collection for their everyday and special occasion wear.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Ayesha Malik",
                city: "Lahore",
                initials: "AM",
                rating: 5,
                review: "Bohot hi khubsoorat suit mila! Fabric bilkul soft hai aur stitching perfect. Dono colors bilkul wahi nikal ke aayi jo pictures mein dikh rahi thi. Definitely order karungi dobara.",
              },
              {
                name: "Sana Tariq",
                city: "Karachi",
                initials: "ST",
                rating: 5,
                review: "Maine eid ke liye 2 suits order kiye the — dono time pe aa gaye aur packaging bhi bohot achi thi. Quality se bilkul satisfy hun. MS Collection ne dil jeet liya!",
              },
              {
                name: "Fatima Noor",
                city: "Islamabad",
                initials: "FN",
                rating: 5,
                review: "Unstitched fabric ka quality dekh ke hairan reh gayi. Lawn itna smooth aur colors itne vibrant hain. Tailor ne bhi tarif ki. Bohot hi behtareen experience raha.",
              },
              {
                name: "Zara Ahmed",
                city: "Faisalabad",
                initials: "ZA",
                rating: 5,
                review: "Delivery bahut fast thi — sirf 2 din mein suit ghar aa gaya. Size bilkul sahi tha aur style bhi ekdum trendy. Apni saheli ko bhi recommend kar chuki hun!",
              },
              {
                name: "Hira Baig",
                city: "Multan",
                initials: "HB",
                rating: 5,
                review: "WhatsApp pe order karna bohot asan tha. Team ne sab kuch clear explain kiya. Suit mila toh bas dil khush ho gaya — fabric, cut, sab kuch first class tha.",
              },
              {
                name: "Nadia Hussain",
                city: "Rawalpindi",
                initials: "NH",
                rating: 5,
                review: "Pehli baar order kiya tha thoda dar ke — lekin ab toh regular customer hun! Quality kabhi disappoint nahi karti. Har baar naya suit lena accha lagta hai MS Collection se.",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="flex flex-col gap-4 p-6 transition-all duration-300"
                style={{
                  background: "rgba(247,246,242,0.04)",
                  border: "1px solid rgba(247,246,242,0.1)",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(247,246,242,0.08)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(184,151,90,0.4)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(247,246,242,0.04)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(247,246,242,0.1)"; }}
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#b8975a" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>

                {/* Review text */}
                <p className="flex-1 text-sm leading-7" style={{ color: "#c8c5bb" }}>
                  &ldquo;{t.review}&rdquo;
                </p>

                {/* Customer info */}
                <div className="flex items-center gap-3 pt-2" style={{ borderTop: "1px solid rgba(247,246,242,0.08)" }}>
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                    style={{ background: "rgba(184,151,90,0.2)", color: "#b8975a" }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#f7f6f2" }}>{t.name}</p>
                    <p className="text-[11px] uppercase tracking-wider" style={{ color: "#9c9a92" }}>{t.city}</p>
                  </div>
                  <div className="ml-auto">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(184,151,90,0.3)" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom rating summary */}
          <div className="mt-12 flex flex-col items-center gap-2 text-center">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#b8975a" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <p className="font-display text-3xl" style={{ color: "#f7f6f2" }}>4.9 / 5</p>
            <p className="text-xs uppercase tracking-widest" style={{ color: "#9c9a92" }}>Based on 500+ verified orders</p>
          </div>
        </div>
      </section>
    </main>
  );
}
