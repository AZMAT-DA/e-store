"use client";

import ProductCard from "@/components/ProductCard";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const NEW_PRODUCTS = [
  { id: 101, name: "Zenith Volt", price: 249, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", category: "Limited" },
  { id: 102, name: "Solaris Prime", price: 299, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772", category: "Exclusive" },
  { id: 103, name: "Nebula Echo", price: 279, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa", category: "Limited" },
];

export default function NewArrivalsPage() {
  return (
    <div className="container mx-auto px-8 md:px-16 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center mb-20"
      >
        <div className="flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-sm mb-4">
          <Sparkles size={20} /> JUST DROPPED
        </div>
        <h1 className="text-7xl font-black tracking-tighter mb-6">NEW ARRIVALS</h1>
        <p className="text-white/40 max-w-2xl text-lg">
          Be the first to step into the future. Our latest collection features cutting-edge materials and designs that push the boundaries of performance.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {NEW_PRODUCTS.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      <div className="mt-20 glass-card p-12 text-center border-primary/20 bg-primary/5">
         <h2 className="text-3xl font-bold mb-4">JOIN THE WAITLIST</h2>
         <p className="text-white/50 mb-8">Get notified before our next big drop. Exclusive access for members only.</p>
         <div className="flex max-w-md mx-auto gap-4">
           <input type="email" placeholder="email@example.com" className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 focus:border-primary focus:outline-none" />
           <button className="px-8 py-3 bg-primary rounded-xl font-bold">SUBSCRIBE</button>
         </div>
      </div>
    </div>
  );
}
