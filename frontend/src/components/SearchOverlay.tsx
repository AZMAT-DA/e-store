"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Search as SearchIcon, ArrowRight } from "lucide-react";

export default function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex flex-col p-8 md:p-20"
        >
          <button 
            onClick={onClose}
            className="absolute top-10 right-10 p-4 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={32} />
          </button>

          <div className="max-w-4xl mx-auto w-full mt-20">
            <div className="relative">
              <input 
                autoFocus
                type="text" 
                placeholder="WHAT ARE YOU LOOKING FOR?"
                className="w-full bg-transparent border-b-2 border-white/20 py-8 text-4xl md:text-6xl font-black uppercase tracking-tighter focus:outline-none focus:border-primary transition-colors"
              />
              <SearchIcon className="absolute right-0 top-1/2 -translate-y-1/2 text-white/20" size={48} />
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-white/40 font-bold uppercase tracking-widest text-sm mb-6">Popular Searches</h3>
                <div className="flex flex-wrap gap-4">
                  {["Air-Glow", "Neon", "Elite", "Runners", "Limited Edition"].map(term => (
                    <button key={term} className="px-6 py-2 rounded-full border border-white/10 hover:border-primary hover:text-primary transition-all font-medium">
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-white/40 font-bold uppercase tracking-widest text-sm mb-6">Trending Collections</h3>
                <ul className="space-y-4">
                  {["Summer Drop 2026", "The Marathon Pack", "Carbon Series"].map(col => (
                    <li key={col}>
                      <button className="flex items-center gap-2 text-xl font-bold hover:text-primary transition-colors group">
                        {col} <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" size={20} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
