"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User, Settings, Package, LogOut, ChevronRight } from "lucide-react";

export default function ProfileOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-96 z-[101] glass-card rounded-none border-l border-white/10 p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-2xl font-black italic">ACCOUNT</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
                <X size={24} />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-12 p-4 bg-white/5 rounded-2xl">
               <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-black">JD</div>
               <div>
                 <h3 className="font-bold text-lg leading-none">John Doe</h3>
                 <p className="text-white/40 text-sm mt-1">premium member</p>
               </div>
            </div>

            <nav className="space-y-2">
               {[
                 { icon: User, label: "My Profile" },
                 { icon: Package, label: "Order History" },
                 { icon: Settings, label: "Account Settings" },
               ].map((item) => (
                 <button key={item.label} className="w-full flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-colors group">
                   <div className="flex items-center gap-4">
                     <item.icon size={20} className="text-white/40 group-hover:text-primary" />
                     <span className="font-bold">{item.label}</span>
                   </div>
                   <ChevronRight size={18} className="text-white/20" />
                 </button>
               ))}
            </nav>

            <div className="mt-auto">
               <button className="w-full flex items-center gap-4 p-4 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors font-bold">
                 <LogOut size={20} /> LOG OUT
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
