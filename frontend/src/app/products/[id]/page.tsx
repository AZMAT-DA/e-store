"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Heart, Share2, ArrowLeft, Star } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const PRODUCTS = [
  { id: 1, name: "SoleStride Air-Glow", price: 129, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", category: "Sneakers", description: "Engineered for speed, designed for comfort. The Air-Glow features a revolutionary cushioning system that propels you forward with every step." },
  { id: 2, name: "Classic Onyx Oxford", price: 189, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772", category: "Formal", description: "A timeless classic for the modern professional. Crafted from premium full-grain leather with a focus on durability and elegance." },
  // ... added as fallback
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === Number(id)) || PRODUCTS[0];

  return (
    <div className="container mx-auto px-8 md:px-16 py-12">
      <Link href="/shop" className="flex items-center gap-2 text-white/40 hover:text-primary transition-colors mb-8 font-bold">
        <ArrowLeft size={18} /> BACK TO SHOP
      </Link>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Image Section */}
        <div className="lg:w-1/2">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card aspect-square p-12 flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-primary/5 blur-[80px] rounded-full" />
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain relative z-10 hover:scale-110 transition-transform duration-700"
            />
          </motion.div>
          
          <div className="grid grid-cols-4 gap-4 mt-6">
             {[1,2,3,4].map((i) => (
               <div key={i} className="glass-card aspect-square p-2 opacity-50 hover:opacity-100 cursor-pointer">
                 <img src={product.image} className="w-full h-full object-contain" />
               </div>
             ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:w-1/2">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">{product.category}</span>
          <h1 className="text-6xl font-black mb-6 tracking-tighter">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-1 text-accent">
              {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <span className="text-white/30 border-l border-white/10 pl-4">128 Customer Reviews</span>
          </div>

          <p className="text-3xl font-black mb-8">${product.price}.00</p>
          
          <p className="text-white/50 text-lg leading-relaxed mb-12">
            {product.description}
          </p>

          <div className="mb-12">
            <h4 className="font-bold text-sm uppercase tracking-widest mb-4">Select Size</h4>
            <div className="flex flex-wrap gap-3">
              {[7, 8, 9, 10, 11, 12].map(size => (
                <button key={size} className="w-14 h-14 border border-white/10 rounded-xl flex items-center justify-center font-bold hover:border-primary hover:text-primary transition-all">
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 py-5 bg-primary rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform active:scale-95 shadow-2xl shadow-primary/20">
              <ShoppingCart /> ADD TO BAG
            </button>
            <button className="p-5 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors">
              <Heart />
            </button>
            <button className="p-5 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors">
              <Share2 />
            </button>
          </div>
          
          <div className="mt-12 pt-12 border-t border-white/5 grid grid-cols-2 gap-8 text-sm text-white/40">
            <div>
              <p className="font-bold text-white mb-2">Free Shipping</p>
              <p>On orders over $150. International shipping available.</p>
            </div>
            <div>
              <p className="font-bold text-white mb-2">30-Day Returns</p>
              <p>Easy returns if the fit isn't perfect for you.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
