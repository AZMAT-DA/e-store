"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full -z-10" />
      
      <div className="container mx-auto px-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-bold tracking-widest text-primary mb-6 uppercase"
        >
          New Season Arrival
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none"
        >
          STEP INTO THE <br />
          <span className="text-transparent bg-clip-text premium-gradient">FUTURE.</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/50 max-w-xl text-lg mb-10 leading-relaxed"
        >
          SoleStride combines cutting-edge technology with high-fashion aesthetics to deliver the ultimate footwear experience.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex gap-4"
        >
          <Link href="/shop" className="px-8 py-4 bg-primary rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform">
            EXPLORE SHOP <ArrowRight size={18} />
          </Link>
          <button className="px-8 py-4 border border-white/10 rounded-full font-bold hover:bg-white/5 transition-colors">
            WATCH STORY
          </button>
        </motion.div>
      </div>

      {/* Hero Image (Abstract Decor) */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-96 h-96 opacity-20 hidden lg:block"
      >
        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff" alt="Hero shoe" className="object-contain" />
      </motion.div>
    </section>
  );
}
