"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ShieldCheck, Truck, RotateCcw, MessageSquare, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shop";
import { colorValue, formatPrice, products } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.productId as string;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h1 className="font-display text-4xl">Product Not Found</h1>
        <p className="mt-4 text-muted-foreground">The piece you are looking for does not exist.</p>
        <Button asChild variant="luxury" className="mt-6">
          <Link href="/stitched">Return to Collections</Link>
        </Button>
      </div>
    );
  }

  return <ProductView product={product} />;
}

function ProductView({ product }: { product: (typeof products)[0] }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "M");
  const { addToBag } = useStore();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToBag(product, selectedColor, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const related = products
    .filter((p) => p.id !== product.id && (p.gender === product.gender || p.collection === product.collection))
    .slice(0, 4);

  // WhatsApp prefilled message
  const whatsappText = `Hello MS Collection! I would like to order:

*Piece:* ${product.name}
*Price:* ${formatPrice(product.price)}
*Size:* ${selectedSize}
*Colour:* ${selectedColor}
*SKU:* ${product.sku}

Please confirm availability and delivery details.`;

  const whatsappUrl = `https://wa.me/923425389685?text=${encodeURIComponent(whatsappText)}`;

  const tailorWhatsAppText = `Hello MS Collection! I have a sizing / custom tailoring query about *${product.name}* (SKU: ${product.sku}).`;
  const tailorWhatsAppUrl = `https://wa.me/923425389685?text=${encodeURIComponent(tailorWhatsAppText)}`;

  return (
    <main className="page-shell py-10 md:py-16">
      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <Link href={product.gender === "Women" ? "/women" : "/men"} className="hover:text-foreground">
          {product.gender}
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        {/* Main Image with smooth zoom hover */}
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary border border-border group">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {product.newArrival && (
            <span className="absolute left-4 top-4 bg-background/95 px-3 py-1 text-xs uppercase tracking-[0.18em] font-medium shadow-xs">
              New Arrival
            </span>
          )}
          {product.originalPrice && (
            <span className="absolute left-4 top-4 bg-sale px-3 py-1 text-xs uppercase tracking-[0.18em] text-sale-foreground font-medium shadow-xs">
              Sale
            </span>
          )}
        </div>

        {/* Product Details & Ordering */}
        <div className="flex flex-col justify-start">
          <p className="eyebrow">
            {product.collection} · {product.category}
          </p>
          <h1 className="font-display text-4xl leading-tight md:text-5xl lg:text-6xl text-foreground">
            {product.name}
          </h1>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-light text-foreground">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-xs text-muted-foreground uppercase tracking-wider">(Domestic Taxes Included)</span>
          </div>

          <p className="mt-6 text-sm leading-7 text-muted-foreground">{product.description}</p>

          <div className="mt-8 space-y-6 border-t border-border pt-6">
            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <span className="text-xs uppercase tracking-[0.16em] font-medium block mb-2">
                  Colour: <strong className="font-semibold text-foreground">{selectedColor}</strong>
                </span>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      title={c}
                      onClick={() => setSelectedColor(c)}
                      className={`h-9 w-9 rounded-full border-2 p-0.5 transition-all ${selectedColor === c ? "border-primary scale-110 shadow-xs" : "border-border hover:scale-105"
                        }`}
                    >
                      <span
                        className="block h-full w-full rounded-full border border-black/10"
                        style={{ backgroundColor: colorValue[c] || "#ddd" }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection (Working buttons) */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.16em] font-medium">
                  Select Size: <strong className="font-semibold text-foreground">{selectedSize}</strong>
                </span>
                <Link href="/size-guide" className="text-xs uppercase tracking-[0.14em] text-gold underline">
                  View Size Guide
                </Link>
              </div>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`min-w-14 h-11 border px-4 text-xs font-semibold uppercase tracking-[0.12em] transition-all ${selectedSize === s
                      ? "border-primary bg-primary text-primary-foreground shadow-xs"
                      : "border-border bg-background text-foreground hover:border-primary hover:bg-secondary/40"
                      }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Shopping Bag & WhatsApp Ordering CTAs */}
            <div className="space-y-3 pt-4">
              <Button
                type="button"
                onClick={handleAddToCart}
                variant="luxury"
                size="lg"
                className={`w-full flex items-center justify-center gap-2 py-4 text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer ${added ? "bg-[#25D366] text-white hover:bg-[#20ba59]" : ""
                  }`}
              >
                <ShoppingBag className="h-4 w-4" />
                {added ? "Added to Shopping Bag ✓" : "Add to Shopping Bag"}
              </Button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white py-3.5 px-6 text-xs uppercase tracking-widest font-semibold hover:bg-[#20ba59] active:scale-[0.99] transition-all shadow-md"
              >
                <WhatsAppIcon className="h-4 w-4 fill-white" />
                Order via WhatsApp
              </a>

              {/* <a
                href={tailorWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full border border-border bg-secondary py-3 px-4 text-xs uppercase tracking-widest font-medium text-foreground hover:border-gold hover:text-gold transition-all"
              >
                <MessageSquare className="h-4 w-4" />
                Inquire Sizing / Custom Tailoring
              </a> */}
            </div>

            {/* Fabric and SKU Info */}
            <div className="border-y border-border py-4 text-xs tracking-wider uppercase text-muted-foreground flex justify-between">
              <span><strong>Fabric:</strong> {product.fabric}</span>
              <span><strong>SKU:</strong> {product.sku}</span>
            </div>

            {/* Boutique Perks */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs text-muted-foreground">
              <div className="flex flex-col items-center gap-1.5 p-2">
                <Truck className="h-5 w-5 text-gold" />
                <span>Complimentary Delivery over PKR 10k</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-2">
                <RotateCcw className="h-5 w-5 text-gold" />
                <span>7-Day Easy Exchange Policy</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-2">
                <ShieldCheck className="h-5 w-5 text-gold" />
                <span>100% Authentic Pakistani Atelier</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-24 border-t border-border pt-16">
          <div className="mb-10 text-center">
            <p className="eyebrow">Curated For You</p>
            <h2 className="font-display text-4xl md:text-5xl">You May Also Admire</h2>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

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
