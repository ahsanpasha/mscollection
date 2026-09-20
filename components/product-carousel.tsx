"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ProductCard } from "@/components/shop";
import type { Product } from "@/lib/catalog";

interface ProductCarouselProps {
  products: Product[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function ProductCarousel({
  products,
  autoPlay = false,
  autoPlayInterval = 5000,
}: ProductCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const checkScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);

    // Calculate approximate active page/index
    const cardWidth = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth : clientWidth;
    if (cardWidth > 0) {
      const idx = Math.round(scrollLeft / (cardWidth + 16)); // 16px gap
      setActiveIndex(Math.max(0, Math.min(idx, products.length - 1)));
    }
  }, [products.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    const clientWidth = el.clientWidth;
    // Scroll by roughly 80% of container width or by card width
    const scrollAmount = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const scrollToIndex = (index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    if (children[index]) {
      children[index].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    }
  };

  // Autoplay functionality
  useEffect(() => {
    if (!autoPlay || isHovered || (!canScrollRight && activeIndex === products.length - 1)) return;

    const interval = setInterval(() => {
      const el = containerRef.current;
      if (!el) return;

      if (canScrollRight) {
        scroll("right");
      } else {
        // Loop back to start smooth
        el.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, isHovered, canScrollRight, activeIndex, products.length]);

  if (!products || products.length === 0) return null;

  return (
    <div
      className="relative group/carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Navigation Arrow Left */}
      <button
        type="button"
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        aria-label="Previous products"
        className={`absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/95 text-stone-800 shadow-lg border border-stone-200 backdrop-blur-sm transition-all duration-300 hover:bg-[#141312] hover:text-white hover:border-[#141312] disabled:opacity-0 disabled:pointer-events-none cursor-pointer ${
          canScrollLeft ? "opacity-90 group-hover/carousel:opacity-100" : "opacity-0"
        }`}
      >
        <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Navigation Arrow Right */}
      <button
        type="button"
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        aria-label="Next products"
        className={`absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/95 text-stone-800 shadow-lg border border-stone-200 backdrop-blur-sm transition-all duration-300 hover:bg-[#141312] hover:text-white hover:border-[#141312] disabled:opacity-0 disabled:pointer-events-none cursor-pointer ${
          canScrollRight ? "opacity-90 group-hover/carousel:opacity-100" : "opacity-0"
        }`}
      >
        <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Scrollable Track */}
      <div
        ref={containerRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2 px-1 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[75%] sm:w-[46%] md:w-[31%] lg:w-[23.5%] shrink-0 snap-start transition-transform duration-300"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      {products.length > 4 && (
        <div className="mt-6 flex items-center justify-center gap-1.5">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to item ${i + 1}`}
              className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                i === activeIndex
                  ? "w-6 bg-[#dfc187]"
                  : "w-1.5 bg-stone-300 hover:bg-stone-500"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
