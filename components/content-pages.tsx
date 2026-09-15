"use client";

import Link from "next/link";
import { Check, Minus, Plus, Trash2, Search, Truck, RotateCcw, ShieldCheck, User, Package, MapPin, HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductGrid, SectionTitle } from "@/components/shop";
import { collectionCopy, formatPrice, products } from "@/lib/catalog";
import { useStore } from "@/lib/store";

/* -------------------------------------------------------------------------- */
/*                               COLLECTIONS PAGE                             */
/* -------------------------------------------------------------------------- */
export function CollectionsPage() {
  const names = Object.keys(collectionCopy);
  return (
    <main>
      <div className="editorial-banner">
        <div>
          <p className="eyebrow">The Lookbook</p>
          <h1>Collections</h1>
          <p>Seasonal stories rooted in craft, colour and the quiet confidence of Pakistani dress.</p>
        </div>
      </div>
      <div className="page-shell grid gap-x-6 gap-y-14 py-16 md:grid-cols-2">
        {names.map((n, i) => (
          <Link href={i % 2 ? "/men" : "/women"} key={n} className="group">
            <div className="aspect-[4/5] overflow-hidden bg-secondary">
              <img
                src={i % 2 ? "/assets/editorial-men.jpg" : "/assets/editorial-heritage.jpg"}
                alt={`${n} collection`}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
              />
            </div>
            <p className="eyebrow mt-5">Chapter {String(i + 1).padStart(2, "0")}</p>
            <h2 className="font-display text-4xl">{n}</h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">{collectionCopy[n]}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*                                WISHLIST PAGE                               */
/* -------------------------------------------------------------------------- */
export function WishlistPage() {
  const { wishlist } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));
  return (
    <main className="page-shell py-16">
      <SectionTitle
        eyebrow="Saved for later"
        title="Your Wishlist"
        copy="A considered edit of the pieces you love."
      />
      {items.length ? (
        <ProductGrid items={items} />
      ) : (
        <Empty
          title="Your wishlist is waiting"
          copy="Save the pieces that speak to you, then return when the moment feels right."
          href="/new-arrivals"
          label="Explore new arrivals"
        />
      )}
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  CART PAGE                                 */
/* -------------------------------------------------------------------------- */
export function CartPage() {
  const { bag, removeFromBag, updateQuantity } = useStore();
  const subtotal = bag.reduce((n, x) => n + x.product.price * x.quantity, 0);

  return (
    <main className="page-shell py-14">
      <h1 className="font-display text-5xl md:text-7xl">Shopping Bag</h1>
      {!bag.length ? (
        <Empty
          title="Your bag is empty"
          copy="Discover timeless pieces designed to be worn and remembered."
          href="/women"
          label="Continue shopping"
        />
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
          <div>
            {bag.map((x) => (
              <div
                key={`${x.product.id}-${x.color}-${x.size}`}
                className="grid grid-cols-[100px_minmax(0,1fr)_auto] gap-4 border-t border-border py-6 sm:grid-cols-[140px_minmax(0,1fr)_auto]"
              >
                <img src={x.product.image} alt={x.product.name} className="aspect-[3/4] w-full object-cover" />
                <div className="min-w-0">
                  <p className="eyebrow">{x.product.collection}</p>
                  <h2 className="font-display text-2xl">{x.product.name}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {x.color} · {x.size}
                  </p>
                  <div className="mt-4 flex w-fit items-center border border-border">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => updateQuantity(x.product.id, x.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center text-sm">{x.quantity}</span>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => updateQuantity(x.product.id, x.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatPrice(x.product.price * x.quantity)}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromBag(x.product.id)}
                    className="mt-2 text-muted-foreground hover:text-destructive"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div>
            <OrderSummary subtotal={subtotal} />
            <Button asChild variant="luxury" size="lg" className="mt-6 w-full">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}

function OrderSummary({ subtotal }: { subtotal: number }) {
  const delivery = subtotal === 0 ? 0 : subtotal >= 10000 ? 0 : 350;
  return (
    <aside className="bg-secondary p-7">
      <h2 className="font-display text-2xl">Order Summary</h2>
      <div className="mt-6 space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Estimated Delivery</span>
          <span>{delivery === 0 ? "Complimentary" : formatPrice(delivery)}</span>
        </div>
        <div className="border-t border-border pt-4 flex justify-between font-semibold text-base">
          <span>Total</span>
          <span>{formatPrice(subtotal + delivery)}</span>
        </div>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Complimentary domestic delivery on all orders above PKR 10,000.
      </p>
    </aside>
  );
}

/* -------------------------------------------------------------------------- */
/*                                CHECKOUT PAGE                               */
/* -------------------------------------------------------------------------- */
export function CheckoutPage() {
  const { bag, clearBag } = useStore();
  const subtotal = bag.reduce((n, x) => n + x.product.price * x.quantity, 0);
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `MSC-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(id);
    setSubmitted(true);
    clearBag();
  };

  if (submitted) {
    return (
      <main className="page-shell py-20">
        <div className="mx-auto max-w-xl text-center bg-secondary p-8 sm:p-12 border border-border">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Check className="h-8 w-8" />
          </div>
          <p className="eyebrow mt-6">Thank You for Your Order</p>
          <h1 className="font-display text-4xl sm:text-5xl">Order Confirmed</h1>
          <p className="mt-4 text-muted-foreground">
            Your order reference is <strong className="text-foreground">{orderId}</strong>. We have sent a confirmation details SMS/email with tracking info.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="luxury" size="lg">
              <Link href="/track-order">Track This Order</Link>
            </Button>
            <Button asChild variant="luxury-outline" size="lg">
              <Link href="/women">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  if (!bag.length) {
    return (
      <main className="page-shell py-14">
        <Empty
          title="Your bag is empty"
          copy="Please add items to your shopping bag before proceeding to checkout."
          href="/women"
          label="Browse Collections"
        />
      </main>
    );
  }

  return (
    <main className="page-shell py-14">
      <h1 className="font-display text-5xl md:text-7xl">Checkout</h1>
      <div className="mt-10 grid gap-14 lg:grid-cols-[1fr_380px]">
        <form onSubmit={handleSubmit}>
          <FormSection title="1. Contact Details">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="First Name" />
              <Input label="Last Name" />
            </div>
            <Input label="Email Address" type="email" />
            <Input label="Mobile Number (e.g. 03001234567)" type="tel" />
          </FormSection>

          <FormSection title="2. Delivery Address">
            <Input label="Street Address / Apartment / House No." />
            <div className="grid gap-4 sm:grid-cols-3">
              <Input label="City (e.g. Lahore)" />
              <Input label="Province (e.g. Punjab)" />
              <Input label="Postal Code" />
            </div>
          </FormSection>

          <FormSection title="3. Payment Method">
            {["Cash on Delivery (COD)", "Bank Transfer / Raast", "Debit / Credit Card"].map((x, idx) => (
              <label key={x} className="choice">
                <input type="radio" name="paymentMethod" defaultChecked={idx === 0} />
                <span>
                  <strong>{x}</strong>
                  <small>
                    {idx === 0
                      ? "Pay in cash when your parcel arrives at your doorstep"
                      : idx === 1
                      ? "Direct transfer via Raast/IBFT; invoice sent after checkout"
                      : "Secure Visa / MasterCard online payment gateway"}
                  </small>
                </span>
              </label>
            ))}
          </FormSection>
          <Button variant="luxury" size="lg" type="submit" className="mt-8 w-full">
            Place Order · {formatPrice(subtotal + (subtotal >= 10000 ? 0 : 350))}
          </Button>
        </form>
        <div>
          <OrderSummary subtotal={subtotal} />
          <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
            <Check className="h-4 w-4" /> Secure checkout &amp; fast nationwide delivery.
          </div>
        </div>
      </div>
    </main>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 border-t border-border pt-7">
      <h2 className="mb-5 font-display text-3xl">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Input({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="field-label">
      {label}
      <input type={type} className="field" required />
    </label>
  );
}

function Empty({
  title,
  copy,
  href,
  label,
}: {
  title: string;
  copy: string;
  href: string;
  label: string;
}) {
  return (
    <div className="mx-auto my-20 max-w-lg text-center">
      <h2 className="font-display text-4xl">{title}</h2>
      <p className="mt-4 text-muted-foreground">{copy}</p>
      <Button asChild variant="luxury" size="lg" className="mt-7">
        <Link href={href}>{label}</Link>
      </Button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 OUR STORY                                  */
/* -------------------------------------------------------------------------- */
export function StoryPage() {
  return (
    <main>
      <div className="story-hero">
        <img src="/assets/editorial-heritage.jpg" alt="MS Collection heritage craftsmanship" />
        <div>
          <p className="eyebrow text-inverse-muted">Our Story</p>
          <h1>
            Made with memory.
            <br />
            Designed for now.
          </h1>
        </div>
      </div>
      <div className="page-shell py-20">
        <SectionTitle
          eyebrow="MS Collection"
          title="Clothing with a sense of place"
          copy="We create enduring Pakistani dress through a dialogue between heritage craft and modern life."
        />
        <div className="mt-16 grid gap-12 md:grid-cols-2 md:items-center">
          <img src="/assets/editorial-men.jpg" alt="MS Collection modern menswear" className="aspect-[4/5] w-full object-cover" />
          <div className="max-w-xl md:pl-10">
            {[
              ["Our Philosophy", "Buy less, choose beautifully, and return often to pieces made with intention."],
              ["Craftsmanship", "Every line, stitch and finish is considered for balance, comfort and lasting elegance."],
              ["Fabric & Quality", "We choose textiles for their hand, fall and ability to become more personal with wear."],
              ["Pakistani Heritage", "Our vocabulary begins at home—in proportion, ornament, colour and the rituals of dressing."],
              ["Our Vision", "To share a confident, refined expression of Pakistani style with the world."],
            ].map(([t, c]) => (
              <section key={t} className="border-t border-border py-6">
                <h2 className="font-display text-3xl">{t}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{c}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*                                CONTACT PAGE                                */
/* -------------------------------------------------------------------------- */
export function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="page-shell py-16">
      <div className="grid gap-14 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Client Services</p>
          <h1 className="font-display text-6xl">We would be delighted to hear from you.</h1>
          <p className="mt-6 max-w-lg leading-7 text-muted-foreground">
            For styling advice, order enquiries, custom sizing, or a private atelier appointment, reach out to us.
          </p>
          <div className="mt-10 border-y border-border py-8 text-sm leading-8">
            <p><strong>Phone / WhatsApp:</strong> +92 300 000 0000</p>
            <p><strong>Email:</strong> care@mscollection.pk</p>
            <p><strong>Flagship Atelier:</strong> Gulberg III, Lahore, Pakistan</p>
            <p><strong>Atelier Hours:</strong> Monday–Saturday · 11:00 AM – 8:00 PM</p>
          </div>
        </div>
        <div>
          {sent ? (
            <div className="bg-secondary p-10 text-center">
              <Check className="mx-auto h-10 w-10 text-gold" />
              <h2 className="font-display text-3xl mt-4">Message Received</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Thank you for contacting MS Collection. Our concierge team will respond within 24 hours.
              </p>
              <Button variant="luxury-outline" className="mt-6" onClick={() => setSent(false)}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="bg-secondary p-7 md:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <Input label="Full Name" />
                <Input label="Email Address" type="email" />
                <Input label="Phone / WhatsApp" />
                <Input label="Subject / Order ID" />
              </div>
              <label className="field-label mt-5">
                Message
                <textarea className="field min-h-32 resize-none" required placeholder="How may we assist you?" />
              </label>
              <Button variant="luxury" size="lg" className="mt-6 w-full" type="submit">
                Send Enquiry
              </Button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*                              TRACK ORDER PAGE                              */
/* -------------------------------------------------------------------------- */
export function TrackOrderPage() {
  const [trackingId, setTrackingId] = useState("");
  const [result, setResult] = useState<null | {
    id: string;
    status: string;
    courier: string;
    destination: string;
    eta: string;
    step: number;
  }>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    setResult({
      id: trackingId.toUpperCase(),
      status: "In Transit with Courier",
      courier: "TCS Express Priority",
      destination: "Lahore, Pakistan",
      eta: "Within 24-48 Hours",
      step: 3,
    });
  };

  return (
    <main className="page-shell py-16">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Courier & Dispatch</p>
        <h1 className="font-display text-5xl md:text-6xl">Track Your Order</h1>
        <p className="mt-4 text-base text-muted-foreground">
          Enter your Order ID (e.g. MSC-104928) or Courier tracking number provided via SMS/Email.
        </p>

        <form onSubmit={handleTrack} className="mt-8 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            required
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="e.g. MSC-104928"
            className="field flex-1 text-base uppercase"
          />
          <Button variant="luxury" size="lg" type="submit" className="sm:w-48">
            <Search className="h-4 w-4 mr-2" /> Track Order
          </Button>
        </form>

        {result && (
          <div className="mt-12 border border-border bg-secondary p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Order Reference</p>
                <h3 className="font-display text-3xl font-semibold">{result.id}</h3>
              </div>
              <span className="bg-primary px-3.5 py-1.5 text-xs uppercase tracking-widest text-primary-foreground">
                {result.status}
              </span>
            </div>

            <div className="grid gap-6 py-6 sm:grid-cols-3 text-sm">
              <div>
                <span className="text-muted-foreground block text-xs uppercase">Courier Partner</span>
                <strong className="font-medium text-foreground">{result.courier}</strong>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs uppercase">Destination</span>
                <strong className="font-medium text-foreground">{result.destination}</strong>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs uppercase">Estimated Delivery</span>
                <strong className="font-medium text-foreground">{result.eta}</strong>
              </div>
            </div>

            {/* Step progress */}
            <div className="mt-6 border-t border-border pt-8">
              <div className="grid grid-cols-4 text-center text-xs">
                {[
                  { title: "Order Placed", done: true },
                  { title: "Atelier QC", done: true },
                  { title: "In Transit", done: true },
                  { title: "Delivered", done: false },
                ].map((s, idx) => (
                  <div key={s.title} className="flex flex-col items-center gap-2">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        s.done ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <span className={s.done ? "font-medium text-foreground" : "text-muted-foreground"}>
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-14 border-t border-border pt-8 grid sm:grid-cols-3 gap-6 text-sm">
          <div className="flex items-start gap-3">
            <Truck className="h-5 w-5 text-gold shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold">Nationwide Delivery</h4>
              <p className="text-muted-foreground text-xs mt-1">2-4 working days for major cities.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-gold shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold">Tracked Courier</h4>
              <p className="text-muted-foreground text-xs mt-1">Full SMS & WhatsApp tracking updates.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <RotateCcw className="h-5 w-5 text-gold shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold">Need Support?</h4>
              <p className="text-muted-foreground text-xs mt-1">WhatsApp support available 11am-8pm.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*                               SIZE GUIDE PAGE                              */
/* -------------------------------------------------------------------------- */
export function SizeGuidePage() {
  const [tab, setTab] = useState<"women" | "men">("women");

  return (
    <main className="page-shell py-16">
      <div className="mx-auto max-w-4xl">
        <p className="eyebrow">Fit & Proportion</p>
        <h1 className="font-display text-5xl md:text-6xl">Size Guide</h1>
        <p className="mt-4 text-base text-muted-foreground">
          Find your exact fit for MS Collection prêt, unstitched sets, and formal menswear. All measurements are given in inches.
        </p>

        <div className="mt-8 flex gap-4 border-b border-border">
          <button
            onClick={() => setTab("women")}
            className={`pb-3 text-sm font-medium uppercase tracking-widest transition-all ${
              tab === "women" ? "border-b-2 border-primary text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Women&apos;s Prêt &amp; Formals
          </button>
          <button
            onClick={() => setTab("men")}
            className={`pb-3 text-sm font-medium uppercase tracking-widest transition-all ${
              tab === "men" ? "border-b-2 border-primary text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Men&apos;s Kurtas &amp; Waistcoats
          </button>
        </div>

        {tab === "women" ? (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left text-sm border border-border">
              <thead className="bg-secondary font-display text-base">
                <tr>
                  <th className="p-4 border-b border-border">Size</th>
                  <th className="p-4 border-b border-border">Bust (in)</th>
                  <th className="p-4 border-b border-border">Waist (in)</th>
                  <th className="p-4 border-b border-border">Hip (in)</th>
                  <th className="p-4 border-b border-border">Shirt Length (in)</th>
                  <th className="p-4 border-b border-border">Trouser Length (in)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["XS", "36", "32", "38", "42", "37"],
                  ["S", "38", "34", "40", "43", "38"],
                  ["M", "40", "36", "43", "44", "38.5"],
                  ["L", "43", "40", "47", "45", "39"],
                  ["XL", "46", "44", "50", "45", "39.5"],
                ].map(([sz, b, w, h, sl, tl]) => (
                  <tr key={sz} className="hover:bg-secondary/40">
                    <td className="p-4 font-semibold">{sz}</td>
                    <td className="p-4 text-muted-foreground">{b}</td>
                    <td className="p-4 text-muted-foreground">{w}</td>
                    <td className="p-4 text-muted-foreground">{h}</td>
                    <td className="p-4 text-muted-foreground">{sl}</td>
                    <td className="p-4 text-muted-foreground">{tl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left text-sm border border-border">
              <thead className="bg-secondary font-display text-base">
                <tr>
                  <th className="p-4 border-b border-border">Size</th>
                  <th className="p-4 border-b border-border">Collar (in)</th>
                  <th className="p-4 border-b border-border">Chest (in)</th>
                  <th className="p-4 border-b border-border">Kurta Length (in)</th>
                  <th className="p-4 border-b border-border">Sleeve Length (in)</th>
                  <th className="p-4 border-b border-border">Waistcoat Chest (in)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["S (38)", "15", "40", "40", "24.5", "40"],
                  ["M (40)", "15.5", "42", "42", "25", "42"],
                  ["L (42)", "16", "44", "44", "25.5", "44"],
                  ["XL (44)", "16.5", "46", "45", "26", "46"],
                ].map(([sz, col, ch, kl, sl, wc]) => (
                  <tr key={sz} className="hover:bg-secondary/40">
                    <td className="p-4 font-semibold">{sz}</td>
                    <td className="p-4 text-muted-foreground">{col}</td>
                    <td className="p-4 text-muted-foreground">{ch}</td>
                    <td className="p-4 text-muted-foreground">{kl}</td>
                    <td className="p-4 text-muted-foreground">{sl}</td>
                    <td className="p-4 text-muted-foreground">{wc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-12 bg-secondary p-8 border border-border">
          <h3 className="font-display text-2xl">How to Measure</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
            <li><strong>Bust / Chest:</strong> Measure under arms around the fullest part of the bust/chest.</li>
            <li><strong>Waist:</strong> Measure around natural waistline, keeping tape comfortably loose.</li>
            <li><strong>Hips:</strong> Measure around the fullest part of your hips (approx. 8 inches below waist).</li>
            <li><strong>Custom Alterations:</strong> For bespoke tailoring requirements on unstitched fabric, contact our atelier.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  FAQS PAGE                                 */
/* -------------------------------------------------------------------------- */
export function FaqsPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "What payment methods do you accept in Pakistan?",
      a: "We accept Cash on Delivery (COD) across Pakistan, direct Bank Transfer via Raast/IBFT, and all major Debit/Credit Cards (Visa & MasterCard).",
    },
    {
      q: "How long does domestic shipping take?",
      a: "Orders for major metropolitan cities (Lahore, Karachi, Islamabad, Rawalpindi) are delivered in 2–4 business days. Other cities and nationwide areas take 3–6 business days.",
    },
    {
      q: "Are shipping charges free?",
      a: "Yes! We offer complimentary shipping across Pakistan on all orders above PKR 10,000. For orders below this threshold, a flat delivery fee of PKR 350 applies.",
    },
    {
      q: "What is your return and exchange policy?",
      a: "We offer a 7-day hassle-free exchange policy on unworn, unwashed prêt with all original tags attached. Unstitched articles must be in original uncut condition.",
    },
    {
      q: "Do you offer international shipping?",
      a: "Yes, we ship internationally via DHL Express to the UK, USA, UAE, Canada, and Europe. Delivery typically takes 5–8 business days.",
    },
    {
      q: "How can I care for pure lawn and organza fabrics?",
      a: "We recommend gentle dry cleaning for heavily embellished formal ensembles. Pure lawn suits can be hand washed in mild detergent in cold water and ironed on medium heat.",
    },
  ];

  return (
    <main className="page-shell py-16">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Help &amp; Concierge</p>
        <h1 className="font-display text-5xl md:text-6xl">Frequently Asked Questions</h1>
        <p className="mt-4 text-base text-muted-foreground">
          Quick answers to common questions about orders, sizing, delivery and boutique services.
        </p>

        <div className="mt-10 divide-y divide-border border-y border-border">
          {faqs.map((f, idx) => (
            <div key={f.q} className="py-5">
              <button
                type="button"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="flex w-full items-center justify-between text-left font-display text-2xl hover:text-gold transition-colors"
              >
                <span>{f.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                    openIdx === idx ? "rotate-180 text-gold" : "text-muted-foreground"
                  }`}
                />
              </button>
              {openIdx === idx && (
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {f.a}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-14 bg-secondary p-8 border border-border text-center">
          <h3 className="font-display text-2xl">Still have questions?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Our atelier concierge team is always delighted to guide you.
          </p>
          <Button asChild variant="luxury" className="mt-5">
            <Link href="/contact">Contact Concierge</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*                            SHIPPING & DELIVERY                             */
/* -------------------------------------------------------------------------- */
export function ShippingPage() {
  return (
    <main className="page-shell py-16">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Logistics &amp; Fulfillment</p>
        <h1 className="font-display text-5xl md:text-6xl">Shipping &amp; Delivery</h1>
        <p className="mt-4 text-base text-muted-foreground">
          All MS Collection orders are carefully packed in bespoke luxury packaging and dispatched from our Lahore atelier.
        </p>

        <div className="mt-10 space-y-8">
          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl">Domestic Delivery (Pakistan)</h2>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground leading-7">
              <p>• <strong>Major Cities (Karachi, Lahore, Islamabad, Rawalpindi):</strong> 2 to 4 business days.</p>
              <p>• <strong>Other Nationwide Cities:</strong> 3 to 6 business days.</p>
              <p>• <strong>Standard Shipping Fee:</strong> PKR 350 for orders below PKR 10,000.</p>
              <p>• <strong>Complimentary Shipping:</strong> Free nationwide delivery on all orders exceeding PKR 10,000.</p>
            </div>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl">Courier Partners &amp; Tracking</h2>
            <p className="mt-3 text-sm text-muted-foreground leading-7">
              We partner with premier couriers including TCS Express, Leopard Courier, and Call Courier. Once your package is dispatched, you will receive an SMS and email notification with your tracking link.
            </p>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl">International Shipping</h2>
            <p className="mt-3 text-sm text-muted-foreground leading-7">
              Worldwide orders are shipped via DHL Express. International delivery takes 5–8 working days. Customs duties or local taxes (if applicable) are the responsibility of the recipient.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*                            RETURNS & EXCHANGE                              */
/* -------------------------------------------------------------------------- */
export function ReturnsPage() {
  return (
    <main className="page-shell py-16">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Customer Guarantee</p>
        <h1 className="font-display text-5xl md:text-6xl">Returns &amp; Exchange Policy</h1>
        <p className="mt-4 text-base text-muted-foreground">
          We want you to feel completely content with every silhouette you choose from MS Collection.
        </p>

        <div className="mt-10 space-y-8">
          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl">7-Day Exchange Period</h2>
            <p className="mt-3 text-sm text-muted-foreground leading-7">
              You can exchange any unstitched or ready-to-wear article within 7 days of receiving your parcel. The article must be unused, unwashed, and in its original condition with all brand tags and luxury packaging intact.
            </p>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl">How to Initiate an Exchange</h2>
            <div className="mt-3 space-y-2 text-sm text-muted-foreground leading-7">
              <p>1. Send a WhatsApp message to +92 300 000 0000 with your Order Number and photos of the piece.</p>
              <p>2. Our team will verify and book a reverse pickup or advise courier dispatch.</p>
              <p>3. Once received at our Lahore atelier, your replacement piece or store credit coupon will be issued within 48 hours.</p>
            </div>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl">Non-Exchangeable Items</h2>
            <p className="mt-3 text-sm text-muted-foreground leading-7">
              Customized / stitched tailored garments to bespoke measurements and items purchased from our final clearance sale are non-refundable and non-exchangeable unless defective upon arrival.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*                               PRIVACY POLICY                               */
/* -------------------------------------------------------------------------- */
export function PrivacyPage() {
  return (
    <main className="page-shell py-16">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Legal &amp; Security</p>
        <h1 className="font-display text-5xl md:text-6xl">Privacy Policy</h1>
        <p className="mt-4 text-base text-muted-foreground">
          At MS Collection, we hold your trust and privacy with utmost importance.
        </p>

        <div className="mt-10 space-y-8 text-sm text-muted-foreground leading-7">
          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Information We Collect</h2>
            <p className="mt-3">
              We collect your name, shipping address, contact phone number, and email address solely to process your orders, deliver parcels through courier partners, and send dispatch tracking notifications.
            </p>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Payment Security</h2>
            <p className="mt-3">
              We do not store your credit/debit card numbers on our servers. All digital transactions are encrypted via certified banking gateways with industry-standard SSL encryption.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*                             TERMS & CONDITIONS                             */
/* -------------------------------------------------------------------------- */
export function TermsPage() {
  return (
    <main className="page-shell py-16">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Terms of Service</p>
        <h1 className="font-display text-5xl md:text-6xl">Terms &amp; Conditions</h1>
        <p className="mt-4 text-base text-muted-foreground">
          Please read these terms before ordering from the MS Collection boutique website.
        </p>

        <div className="mt-10 space-y-8 text-sm text-muted-foreground leading-7">
          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Product Colors &amp; Craftsmanship</h2>
            <p className="mt-3">
              Due to photographic lighting and device display calibration, subtle variations in hue or embroidery texture may occur. Each piece represents artisanal quality.
            </p>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Pricing &amp; Availability</h2>
            <p className="mt-3">
              All prices are listed in Pakistani Rupees (PKR) inclusive of applicable domestic taxes. We reserve the right to modify prices or adjust product availability without prior notice.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*                                ACCOUNT PAGE                                */
/* -------------------------------------------------------------------------- */
export function AccountPage() {
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [signedIn, setSignedIn] = useState(false);

  return (
    <main className="page-shell py-16">
      <div className="mx-auto max-w-md">
        <p className="eyebrow text-center">Boutique Membership</p>
        <h1 className="font-display text-5xl text-center">
          {signedIn ? "Welcome Back" : mode === "signin" ? "Sign In" : "Create Account"}
        </h1>

        {signedIn ? (
          <div className="mt-10 border border-border bg-secondary p-8 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display text-2xl font-bold">
              MS
            </div>
            <h3 className="font-display text-2xl mt-4">Atelier VIP Member</h3>
            <p className="text-xs text-muted-foreground mt-1">care@mscollection.pk</p>
            <div className="mt-8 border-t border-border pt-6 space-y-3">
              <Button asChild variant="luxury" className="w-full">
                <Link href="/wishlist">View Saved Wishlist</Link>
              </Button>
              <Button asChild variant="luxury-outline" className="w-full">
                <Link href="/track-order">Track Recent Orders</Link>
              </Button>
              <Button variant="ghost" className="w-full text-xs text-muted-foreground" onClick={() => setSignedIn(false)}>
                Sign Out
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSignedIn(true); }} className="mt-10 bg-secondary p-8 border border-border">
            <div className="flex gap-4 border-b border-border pb-4 mb-6 text-center">
              <button
                type="button"
                onClick={() => setMode("signin")}
                className={`flex-1 pb-2 text-xs uppercase tracking-widest font-semibold ${
                  mode === "signin" ? "border-b-2 border-primary text-foreground" : "text-muted-foreground"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode("register")}
                className={`flex-1 pb-2 text-xs uppercase tracking-widest font-semibold ${
                  mode === "register" ? "border-b-2 border-primary text-foreground" : "text-muted-foreground"
                }`}
              >
                Create Account
              </button>
            </div>

            {mode === "register" && <Input label="Full Name" />}
            <div className="mt-4">
              <Input label="Email Address" type="email" />
            </div>
            <div className="mt-4">
              <Input label="Password" type="password" />
            </div>

            <Button variant="luxury" size="lg" className="mt-6 w-full" type="submit">
              {mode === "signin" ? "Sign In" : "Register Account"}
            </Button>
          </form>
        )}
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 FALLBACK                                   */
/* -------------------------------------------------------------------------- */
export function SimplePage({ title, copy }: { title: string; copy: string }) {
  return (
    <main className="page-shell py-16">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">MS Collection</p>
        <h1 className="font-display text-6xl">{title}</h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">{copy}</p>
        <div className="mt-12 border-t border-border pt-8">
          <h2 className="font-display text-3xl">How can we help?</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Our client services team is available Monday through Saturday. Please contact us for personalised assistance.
          </p>
          <Button asChild variant="luxury-outline" size="lg" className="mt-7">
            <Link href="/contact">Contact client services</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
