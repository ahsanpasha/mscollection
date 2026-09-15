"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "./catalog";

export type BagItem = { product: Product; color: string; size: string; quantity: number };

type Store = {
  bag: BagItem[];
  wishlist: string[];
  addToBag: (p: Product, color?: string, size?: string) => void;
  removeFromBag: (id: string) => void;
  updateQuantity: (id: string, q: number) => void;
  clearBag: () => void;
  toggleWishlist: (id: string) => void;
};

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [bag, setBag] = useState<BagItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      setBag(JSON.parse(localStorage.getItem("ms-bag") || "[]"));
      setWishlist(JSON.parse(localStorage.getItem("ms-wishlist") || "[]"));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("ms-bag", JSON.stringify(bag));
  }, [bag]);

  useEffect(() => {
    localStorage.setItem("ms-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const value = useMemo<Store>(
    () => ({
      bag,
      wishlist,
      addToBag: (product, color = product.colors[0] || "", size = product.sizes[0] || "") =>
        setBag((x) => {
          const i = x.findIndex((v) => v.product.id === product.id && v.color === color && v.size === size);
          return i < 0
            ? [...x, { product, color, size, quantity: 1 }]
            : x.map((v, n) => (n === i ? { ...v, quantity: v.quantity + 1 } : v));
        }),
      removeFromBag: (id) => setBag((x) => x.filter((v) => v.product.id !== id)),
      updateQuantity: (id, q) =>
        setBag((x) => x.map((v) => (v.product.id === id ? { ...v, quantity: Math.max(1, q) } : v))),
      clearBag: () => setBag([]),
      toggleWishlist: (id) =>
        setWishlist((x) => (x.includes(id) ? x.filter((v) => v !== id) : [...x, id])),
    }),
    [bag, wishlist]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const s = useContext(StoreContext);
  if (!s) throw new Error("StoreProvider missing");
  return s;
}
