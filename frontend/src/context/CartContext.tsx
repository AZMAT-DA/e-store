"use client";
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { api, CartResponse } from "@/lib/api";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sid = localStorage.getItem("ss_session_id");
  if (!sid) { sid = Math.random().toString(36).slice(2); localStorage.setItem("ss_session_id", sid); }
  return sid;
}

interface CartContextValue {
  cart: CartResponse | null; isOpen: boolean; isLoading: boolean;
  openCart: () => void; closeCart: () => void;
  addToCart: (productId: number, size?: string) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  updateQty: (itemId: number, qty: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const sid = typeof window !== "undefined" ? getSessionId() : "";

  const fetchCart = useCallback(async () => {
    if (!sid) return;
    try { const data = await api.getCart(sid); setCart(data); } catch {}
  }, [sid]);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const addToCart = async (productId: number, size?: string) => {
    setLoading(true);
    try { const data = await api.addToCart(sid, productId, 1, size); setCart(data); setIsOpen(true); }
    finally { setLoading(false); }
  };
  const removeItem = async (itemId: number) => {
    setLoading(true);
    try { const data = await api.removeCartItem(sid, itemId); setCart(data); }
    finally { setLoading(false); }
  };
  const updateQty = async (itemId: number, qty: number) => {
    setLoading(true);
    try { const data = await api.updateCartItem(sid, itemId, qty); setCart(data); }
    finally { setLoading(false); }
  };
  const clearCart = async () => {
    await api.clearCart(sid);
    setCart(prev => prev ? { ...prev, items: [], total_items: 0, subtotal: 0 } : null);
  };

  return (
    <CartContext.Provider value={{ cart, isOpen, isLoading, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false), addToCart, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}
