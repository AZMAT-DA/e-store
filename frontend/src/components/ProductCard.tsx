"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  id: string | number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductCard({ id, name, price, image, category }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="glass-card overflow-hidden group"
    >
      <Link href={`/products/${id}`}>
        <div className="relative h-64 overflow-hidden bg-white/5 p-8">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 inline-block px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] uppercase font-bold text-white/60">
            {category}
          </div>
        </div>
      </Link>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg leading-tight truncate mr-4">{name}</h3>
          <span className="font-black text-primary">${price}</span>
        </div>
        
        <div className="flex items-center gap-1 text-accent mb-6">
          <Star size={12} fill="currentColor" />
          <Star size={12} fill="currentColor" />
          <Star size={12} fill="currentColor" />
          <Star size={12} fill="currentColor" />
          <Star size={12} fill="currentColor" className="opacity-50" />
          <span className="text-[10px] text-white/30 ml-2">(42 Reviews)</span>
        </div>

        <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary hover:border-primary transition-all group-hover:shadow-lg group-hover:shadow-primary/25">
          <ShoppingBag size={18} /> ADD TO CART
        </button>
      </div>
    </motion.div>
  );
}
