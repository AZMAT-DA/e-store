"use client";

import ProductCard from "@/components/ProductCard";
import { Search, Filter } from "lucide-react";

const PRODUCTS = [
  { id: 1, name: "SoleStride Air-Glow", price: 129, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", category: "Sneakers" },
  { id: 2, name: "Classic Onyx Oxford", price: 189, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772", category: "Formal" },
  { id: 3, name: "Crimson Blaze", price: 149, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa", category: "Runners" },
  { id: 4, name: "Aero Alpha", price: 199, image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d", category: "Sport" },
  { id: 5, name: "Midnight Stealth", price: 169, image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86", category: "Sneakers" },
  { id: 6, name: "Terra Trekker", price: 219, image: "https://images.unsplash.com/photo-1539185441755-769473a23570", category: "Boots" },
];

export default function ShopPage() {
  return (
    <div className="container mx-auto px-8 md:px-16 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-black italic tracking-tighter">THE COLLECTION</h1>
          <p className="text-white/40 mt-2">Showing {PRODUCTS.length} curated styles</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
            <input 
              type="text" 
              placeholder="Search shoes..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-10 pr-4 focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full font-bold hover:bg-white/10">
            <Filter size={18} /> FILTER
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
