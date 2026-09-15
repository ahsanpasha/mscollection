"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  ["Women", "/women"],
  ["Men", "/men"],
  ["New Arrivals", "/new-arrivals"],
  ["Collections", "/collections"],
  ["Stitched", "/stitched"],
  ["Unstitched", "/unstitched"],
  ["Sale", "/sale"],
  ["Our Story", "/about"],
  ["Contact", "/contact"],
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf8] text-foreground">
      {/* 100% Solid Opaque Navbar (No transparency on scroll) */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-[#ffffff] shadow-xs">
        <div className="page-shell flex h-20 items-center justify-between gap-4 lg:h-24">
          {/* Logo on Left */}
          <Link href="/" aria-label="MS Collection home" className="flex items-center shrink-0">
            <span className="font-display text-2xl font-bold tracking-[0.2em] sm:text-3xl text-foreground">
              MS COLLECTION
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center justify-end gap-5 xl:gap-7 lg:flex">
            {navLinks.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="nav-link text-[11px] uppercase tracking-[0.18em] font-medium text-foreground/80 hover:text-gold hover:opacity-100 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open navigation menu" className="h-10 w-10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              {/* 100% Solid Opaque Mobile Side Drawer */}
              <SheetContent side="left" className="w-[85%] max-w-sm p-0 bg-[#ffffff] text-foreground border-r border-border shadow-2xl opacity-100">
                <SheetTitle className="sr-only">Main Menu</SheetTitle>
                <SheetDescription className="sr-only">Browse MS Collection sections</SheetDescription>
                
                <div className="border-b border-border p-6 bg-[#ffffff]">
                  <span className="font-display text-2xl font-bold tracking-[0.18em] text-foreground">MS COLLECTION</span>
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground mt-1">Luxury Pakistani Boutique</p>
                </div>

                <nav className="flex flex-col p-6 space-y-1 bg-[#ffffff] h-full overflow-y-auto">
                  {navLinks.map(([label, href]) => (
                    <SheetClose asChild key={href}>
                      <Link
                        href={href}
                        className="border-b border-border/60 py-3.5 font-display text-xl text-foreground hover:text-gold transition-colors block"
                      >
                        {label}
                      </Link>
                    </SheetClose>
                  ))}
                  
                  <div className="pt-6 pb-12">
                    <a
                      href="https://wa.me/923000000000?text=Hello%20MS%20Collection,%20I%20would%20like%20to%20place%20an%20order."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3 px-4 text-xs uppercase tracking-widest font-semibold hover:bg-[#20ba59] transition-colors rounded-none"
                    >
                      <WhatsAppIcon className="h-4 w-4 fill-white" />
                      Order on WhatsApp
                    </a>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1">{children}</div>

      {/* Footer */}
      <Footer />

      {/* Floating Bottom WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-24 bg-[#141312] text-footer-foreground">
      <div className="page-shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          <div className="inline-block bg-[#ffffff] px-4 py-3 text-foreground">
            <span className="font-display text-2xl font-bold tracking-widest">MS COLLECTION</span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-7 text-footer-muted">
            Thoughtfully crafted Pakistani prêt, regal menswear, and unstitched heirlooms designed for timeless elegance.
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs text-footer-muted">
            <span>Lahore Atelier · Nationwide Delivery</span>
          </div>
        </div>

        <FooterLinks
          title="Collections"
          links={[
            ["Women's Prêt", "/women"],
            ["Men's Wear", "/men"],
            ["Stitched Suits", "/stitched"],
            ["Unstitched Lawn & Silk", "/unstitched"],
            ["New Season Drops", "/new-arrivals"],
            ["Festive Sale", "/sale"],
          ]}
        />

        <FooterLinks
          title="Client Care"
          links={[
            ["Our Story", "/about"],
            ["Contact Concierge", "/contact"],
            ["Size Guide", "/size-guide"],
            ["Shipping & Delivery", "/shipping"],
            ["Returns & Exchange", "/returns"],
            ["Frequently Asked Questions", "/faqs"],
          ]}
        />

        <div>
          <h3 className="footer-title">Order Assistance</h3>
          <p className="mt-4 text-sm leading-6 text-footer-muted">
            Need help selecting your size, custom tailoring advice, or placing a bespoke order? Reach our WhatsApp concierge directly.
          </p>
          <div className="mt-6">
            <a
              href="https://wa.me/923000000000?text=Hello%20MS%20Collection,%20I%20need%20assistance%20with%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] text-white px-5 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#20ba59] transition-all"
            >
              <WhatsAppIcon className="h-4 w-4 fill-white" />
              Chat with Stylist
            </a>
          </div>
          <div className="mt-7 flex gap-5 text-xs uppercase tracking-[.14em]">
            <a href="#" className="hover:text-gold transition-colors">Instagram</a>
            <a href="#" className="hover:text-gold transition-colors">Facebook</a>
            <a href="#" className="hover:text-gold transition-colors">TikTok</a>
          </div>
        </div>
      </div>

      <div className="border-t border-footer-muted/20 py-5 text-center text-[10px] uppercase tracking-[.14em] text-footer-muted">
        © 2026 MS Collection. Designed &amp; Tailored in Pakistan.
      </div>
    </footer>
  );
}

function FooterLinks({ title, links }: { title: string; links: readonly (readonly [string, string])[] }) {
  return (
    <div>
      <h3 className="footer-title">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm text-footer-muted">
        {links.map(([x, href]) => (
          <li key={href}>
            <Link href={href} className="hover:text-footer-foreground transition-colors">
              {x}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Floating WhatsApp Button Component */
function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/923000000000?text=Hello%20MS%20Collection,%20I%20would%20like%20to%20enquire%20about%20your%20collection."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 hover:bg-[#20ba59] active:scale-95 transition-all duration-300 group"
    >
      <WhatsAppIcon className="h-6 w-6 fill-white" />
      <span className="text-xs font-semibold uppercase tracking-wider hidden md:inline-block pr-1">
        Order on WhatsApp
      </span>
      <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
      </span>
    </a>
  );
}

/* WhatsApp SVG Icon */
function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15-.2.3-.775.978-.95 1.178-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.414-1.488-.893-.796-1.496-1.778-1.671-2.078-.175-.3-.019-.462.13-.611.136-.134.301-.35.451-.525.15-.175.2-.3.301-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.63-1.025-2.43-.34-1.02-.686-.88-.938-.892l-.65-.01c-.225 0-.588.084-.897.42-.309.336-1.18 1.152-1.18 2.81 0 1.658 1.208 3.26 1.377 3.486.168.225 2.378 3.63 5.762 5.093.805.348 1.433.556 1.923.712.808.257 1.543.221 2.124.134.649-.097 1.996-.816 2.278-1.604.282-.788.282-1.463.197-1.604-.084-.141-.284-.225-.584-.375zm-5.467 7.427C6.671 21.809 2.2 17.337 2.2 11.804c0-2.617 1.018-5.077 2.868-6.927C6.918 3.027 9.378 2.01 11.995 2.01c5.533 0 10.005 4.472 10.005 10.004 0 5.534-4.472 9.795-9.995 9.795zm0-20.21C5.385 1.599 0 6.984 0 13.595c0 2.11.55 4.17 1.595 5.98L0 25.6l6.208-1.558a11.947 11.947 0 0 0 5.797 1.488h.005c6.61 0 11.995-5.385 11.995-11.995 0-3.205-1.248-6.218-3.513-8.483C18.228 2.787 15.215 1.599 12.005 1.599z" />
    </svg>
  );
}
