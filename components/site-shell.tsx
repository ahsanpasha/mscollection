"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { type ReactNode, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { label: "WOMEN", href: "/women" },
  { label: "MEN", href: "/men" },
  { label: "NEW ARRIVALS", href: "/new-arrivals" },
  { label: "COLLECTIONS", href: "/collections" },
  { label: "STITCHED", href: "/stitched" },
  { label: "UNSTITCHED", href: "/unstitched" },
  { label: "SALE", href: "/sale", highlight: true },
  { label: "OUR STORY", href: "/about" },
  { label: "CONTACT", href: "/contact" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#fcfbf8", color: "#1c1b18" }}>
      {/* Refined Nishat Linen Style 100% Transparent Header */}
      <header
        className={`fixed top-0 inset-x-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? "bg-[#141312]/92 backdrop-blur-md border-b border-white/10 py-3 shadow-xl"
            : "bg-gradient-to-b from-black/70 via-black/30 to-transparent py-4 lg:py-5"
        }`}
      >
        <div className="page-shell flex items-center justify-between gap-4">
          {/* Refined Brand Logo - Small Gold Serif Text */}
          <Link href="/" aria-label="MS Collection home" className="flex items-center shrink-0 group">
            <span className="font-display text-lg lg:text-xl font-bold tracking-[0.2em] text-[#dfc187] group-hover:text-white transition-colors drop-shadow-md">
              MS COLLECTION
            </span>
          </Link>

          {/* Desktop Nav Links - Refined Small Nishat Text Style */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[10px] xl:text-[11px] uppercase tracking-[0.18em] transition-all duration-300 drop-shadow-sm relative group ${
                  item.highlight
                    ? "text-[#dfc187] font-bold hover:text-white"
                    : "text-white/90 font-medium hover:text-[#dfc187]"
                }`}
              >
                <span>{item.label}</span>
                {/* Thin hover underline */}
                <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-[#dfc187] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Mobile Hamburger Trigger */}
          <div className="flex items-center lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Open navigation menu"
                    className="h-10 w-10 text-white hover:bg-white/10"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                {/* Dark Luxury Drawer */}
                <SheetContent
                  side="left"
                  className="w-[85%] max-w-sm p-0 border-r border-white/10 flex flex-col justify-between"
                  style={{ background: "#141312", color: "#ffffff" }}
                >
                  <SheetTitle className="sr-only">Main Menu</SheetTitle>
                  <SheetDescription className="sr-only">Browse MS Collection</SheetDescription>

                  <div>
                    <div className="border-b border-white/10 p-6" style={{ background: "#141312" }}>
                      <span className="font-display text-2xl font-bold tracking-[0.2em] text-[#dfc187]">
                        MS COLLECTION
                      </span>
                      <p className="text-[10px] uppercase tracking-widest mt-1 text-stone-400">
                        Luxury Pakistani Boutique
                      </p>
                    </div>

                    <div className="flex flex-col p-6 space-y-0 overflow-y-auto" style={{ background: "#141312" }}>
                      {navLinks.map((item) => (
                        <SheetClose asChild key={item.href}>
                          <Link
                            href={item.href}
                            className="border-b border-white/10 py-3.5 font-display text-lg tracking-widest flex items-center justify-between text-white hover:text-[#dfc187] transition-colors"
                          >
                            <span>{item.label}</span>
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 border-t border-white/10" style={{ background: "#141312" }}>
                    <a
                      href="https://wa.me/923000000000?text=Hello%20MS%20Collection,%20I%20would%20like%20to%20place%20an%20order."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2.5 w-full text-white py-3.5 px-4 text-xs uppercase tracking-widest font-semibold transition-transform active:scale-95 shadow-md"
                      style={{ background: "#25D366" }}
                    >
                      <WAIcon />
                      Order on WhatsApp
                    </a>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1">{children}</div>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="mt-24" style={{ background: "#141312", color: "#f7f6f2" }}>
      <div className="page-shell grid gap-10 py-12 md:grid-cols-3">
        {/* Brand column */}
        <div>
          <span className="font-display text-2xl font-bold tracking-widest" style={{ color: "#f7f6f2" }}>
            MS COLLECTION
          </span>
          <p className="mt-4 max-w-xs text-sm leading-7" style={{ color: "#9c9a92" }}>
            Beautiful shalwar kameez for women and men — stitched and unstitched, for every occasion.
          </p>
          <p className="mt-3 text-xs" style={{ color: "#9c9a92" }}>Nationwide Delivery · Pakistan</p>
          {/* Social icons row */}
          <div className="mt-5 flex items-center gap-3">
            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className="group flex items-center justify-center rounded-full transition-all duration-300"
              style={{ width: 38, height: 38, background: "rgba(156,154,146,0.12)", border: "1px solid rgba(156,154,146,0.2)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(247,246,242,0.12)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(247,246,242,0.5)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(156,154,146,0.12)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(156,154,146,0.2)"; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="#9c9a92" strokeWidth="1.8" className="group-hover:stroke-[#f7f6f2] transition-colors" />
                <circle cx="12" cy="12" r="4.5" stroke="#9c9a92" strokeWidth="1.8" className="group-hover:stroke-[#f7f6f2] transition-colors" />
                <circle cx="17.5" cy="6.5" r="1" fill="#9c9a92" className="group-hover:fill-[#f7f6f2] transition-colors" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              className="group flex items-center justify-center rounded-full transition-all duration-300"
              style={{ width: 38, height: 38, background: "rgba(156,154,146,0.12)", border: "1px solid rgba(156,154,146,0.2)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(247,246,242,0.12)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(247,246,242,0.5)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(156,154,146,0.12)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(156,154,146,0.2)"; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="#9c9a92" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#f7f6f2] transition-colors" />
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="#"
              aria-label="TikTok"
              className="group flex items-center justify-center rounded-full transition-all duration-300"
              style={{ width: 38, height: 38, background: "rgba(156,154,146,0.12)", border: "1px solid rgba(156,154,146,0.2)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(247,246,242,0.12)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(247,246,242,0.5)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(156,154,146,0.12)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(156,154,146,0.2)"; }}
            >
              <svg width="16" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="#9c9a92" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#f7f6f2] transition-colors" />
              </svg>
            </a>
          </div>
        </div>

        <FooterLinks
          title="Collections"
          links={[
            ["Women's Suits", "/women"],
            ["Men's Suits", "/men"],
            ["Stitched", "/stitched"],
            ["Unstitched", "/unstitched"],
            ["New Arrivals", "/new-arrivals"],
            ["Sale", "/sale"],
          ]}
        />

        <FooterLinks
          title="Help"
          links={[
            ["Our Story", "/about"],
            ["Contact Us", "/contact"],
            ["Size Guide", "/size-guide"],
            ["Shipping Info", "/shipping"],
            ["Returns & Exchange", "/returns"],
            ["FAQs", "/faqs"],
          ]}
        />
      </div>

      <div
        className="py-5 text-center text-[10px] uppercase tracking-[.14em]"
        style={{ borderTop: "1px solid rgba(156,154,146,0.2)", color: "#9c9a92" }}
      >
        © 2026 MS Collection. Designed &amp; Tailored in Pakistan.
      </div>
    </footer>
  );
}

function FooterLinks({ title, links }: { title: string; links: readonly (readonly [string, string])[] }) {
  return (
    <div>
      <h3 className="footer-title">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm" style={{ color: "#9c9a92" }}>
        {links.map(([x, href]) => (
          <li key={x}>
            <Link href={href} className="hover:text-footer-foreground transition-colors">
              {x}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Floating WhatsApp ───────────────────────────────────────────────────── */
function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/923000000000?text=Hello%20MS%20Collection,%20I%20would%20like%20to%20enquire%20about%20your%20collection."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
      style={{ background: "#25D366" }}
    >
      <WAIcon size={24} />
      <span className="text-xs font-semibold uppercase tracking-wider hidden md:inline-block pr-1">
        Order on WhatsApp
      </span>
      {/* Pulsing online indicator */}
      <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500" />
      </span>
    </a>
  );
}

/* ─── Proper WhatsApp Icon (Official Simple Path) ────────────────────────── */
function WAIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="white"
      aria-hidden="true"
    >
      <path d="M16 0C7.163 0 0 7.163 0 16c0 2.82.736 5.469 2.027 7.774L.055 32l8.425-2.21A15.94 15.94 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0Zm0 29.333a13.278 13.278 0 0 1-6.773-1.856l-.486-.288-5.004 1.313 1.334-4.876-.317-.502A13.245 13.245 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333Zm7.27-9.878c-.398-.2-2.353-1.161-2.718-1.294-.365-.133-.63-.2-.896.2-.265.398-1.029 1.294-1.261 1.56-.232.265-.465.298-.863.1-.398-.2-1.681-.619-3.2-1.974-1.183-1.054-1.982-2.356-2.214-2.754-.232-.398-.025-.613.174-.811.179-.178.398-.465.597-.697.2-.232.265-.398.398-.664.133-.265.066-.497-.033-.697-.1-.2-.896-2.16-1.228-2.957-.323-.776-.651-.67-.896-.683l-.763-.013c-.265 0-.697.1-1.062.497-.365.398-1.394 1.362-1.394 3.321 0 1.959 1.428 3.852 1.627 4.118.2.265 2.81 4.29 6.807 6.017.951.41 1.694.655 2.272.839.955.305 1.825.262 2.513.159.767-.114 2.353-.962 2.685-1.891.332-.929.332-1.725.232-1.891-.099-.166-.364-.265-.763-.465Z" />
    </svg>
  );
}
