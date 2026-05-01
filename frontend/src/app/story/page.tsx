"use client";

import { motion } from "framer-motion";

export default function StoryPage() {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="h-[70vh] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[100px] rounded-full" />
        
        <div className="text-center px-8">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-8xl font-black tracking-tighter mb-4"
          >
            BORN TO <span className="text-primary">MOVE.</span>
          </motion.h1>
          <p className="text-xl text-white/40 tracking-[0.3em] font-bold">ESTABLISHED 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-8 md:px-16 py-32 space-y-32">
        <div className="flex flex-col md:flex-row gap-20 items-center">
            <div className="md:w-1/2">
                <h2 className="text-5xl font-black mb-8 leading-tight">OUR MISSION IS <br />RE-IMAGINING PERFORMANCE.</h2>
                <p className="text-white/50 text-xl leading-relaxed">
                    SoleStride was founded on a simple principle: high performance shouldn't come at the cost of high fashion. We believe that what you wear on your feet should be a statement of both your capability and your style.
                </p>
            </div>
            <div className="md:w-1/2 glass-card p-4">
                <img src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a" alt="Craftsmanship" className="rounded-2xl" />
            </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse gap-20 items-center">
            <div className="md:w-1/2">
                <h2 className="text-5xl font-black mb-8 leading-tight">CRAFTED WITH <br />FUTURE-TECH.</h2>
                <p className="text-white/50 text-xl leading-relaxed">
                    Every pair of SoleStride sneakers is a marvel of material science. From our proprietary energy-return foam to our recycled ocean-plastic knits, we are building for the next decade, not the next season.
                </p>
            </div>
            <div className="md:w-1/2 glass-card p-4">
                <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff" alt="Technology" className="rounded-2xl" />
            </div>
        </div>
      </section>
      
      {/* Footer Quote */}
      <section className="text-center py-32 bg-white/5">
         <p className="text-4xl font-black italic text-white/20 mb-4 tracking-tighter italic whitespace-nowrap overflow-hidden">
            SPEED • PRECISION • STYLE • PERFORMANCE • SPEED • PRECISION • STYLE • PERFORMANCE
         </p>
         <h3 className="text-3xl font-bold">STAY AHEAD OF THE REST.</h3>
      </section>
    </div>
  );
}
