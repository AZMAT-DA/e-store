"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const COLLECTIONS = [
  { id: 1, name: "THE RUNCore", description: "Engineered for pure speed.", count: 12, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff" },
  { id: 2, name: "URBAN ELITE", description: "Streetwear redefined.", count: 8, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa" },
  { id: 3, name: "MONO BLACK", description: "Stealth aesthetics.", count: 5, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772" },
  { id: 4, name: "TRAIL BLAZER", description: "Outdoor performance.", count: 9, image: "https://images.unsplash.com/photo-1539185441755-769473a23570" },
];

export default function CollectionsPage() {
  return (
    <div className="container mx-auto px-8 md:px-16 py-20">
      <h1 className="text-6xl font-black tracking-tighter mb-16 italic">EXPLORE COLLECTIONS</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {COLLECTIONS.map((col, i) => (
          <motion.div
            key={col.id}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative h-96 rounded-3xl overflow-hidden glass-card p-0 border-0"
          >
            <img 
              src={col.image} 
              alt={col.name} 
              className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-12 flex flex-col justify-end">
              <span className="text-primary font-bold text-sm tracking-widest uppercase mb-2">{col.count} STYLES</span>
              <h2 className="text-4xl font-black mb-4">{col.name}</h2>
              <p className="text-white/60 mb-8 max-w-xs">{col.description}</p>
              <Link href="/shop" className="flex items-center gap-2 font-bold hover:text-primary transition-colors">
                SHOP COLLECTION <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
