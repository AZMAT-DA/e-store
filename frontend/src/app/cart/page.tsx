"use client";

import { ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  return (
    <div className="container mx-auto px-8 md:px-16 py-12">
      <h1 className="text-5xl font-black mb-12 tracking-tighter">YOUR BAG</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="lg:w-2/3 space-y-6">
          <div className="glass-card p-6 flex gap-6 items-center">
            <div className="w-24 h-24 bg-white/5 rounded-xl p-2 shrink-0">
               <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff" alt="shoe" className="w-full h-full object-contain" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl">SoleStride Air-Glow</h3>
              <p className="text-white/40 text-sm">Size: 10 | Color: Neon Crimson</p>
            </div>
            <div className="flex items-center gap-4">
               <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">-</button>
               <span className="font-bold">1</span>
               <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">+</button>
            </div>
            <div className="font-black text-xl w-24 text-right">$129.00</div>
            <button className="p-2 text-white/20 hover:text-primary transition-colors">
              <Trash2 size={20} />
            </button>
          </div>
          
          <div className="text-white/30 text-center py-12 border-2 border-dashed border-white/5 rounded-2xl">
            Add more items to unlock free shipping!
          </div>
        </div>

        {/* Summary */}
        <div className="lg:w-1/3">
          <div className="glass-card p-8 sticky top-32">
            <h3 className="text-2xl font-black mb-6">ORDER SUMMARY</h3>
            
            <div className="space-y-4 mb-8 text-white/60">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-bold">$129.00</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-white font-bold">$15.00</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-4 text-xl text-white">
                <span className="font-black">Total</span>
                <span className="font-black text-primary">$144.00</span>
              </div>
            </div>

            <button className="w-full py-5 bg-white text-black rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all shadow-xl">
              CHECKOUT <ArrowRight />
            </button>
            
            <p className="mt-6 text-[10px] text-white/30 text-center uppercase tracking-widest font-bold">
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
