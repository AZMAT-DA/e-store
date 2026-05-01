"use client";

import Link from "next/link";
import { ShoppingCart, Search, User, Menu } from "lucide-react";
import { useState } from "react";
import SearchOverlay from "./SearchOverlay";
import ProfileOverlay from "./ProfileOverlay";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <nav className="nav-blur h-20 flex items-center justify-between px-8 md:px-16">
        <div className="flex items-center gap-12">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-glow">
            SOLE<span className="text-primary">STRIDE</span>
          </Link>
          <div className="hidden md:flex gap-8 text-sm font-medium text-white/70">
            <Link href="/shop" className="hover:text-primary transition-colors">SHOP</Link>
            <Link href="/new" className="hover:text-primary transition-colors">NEW ARRIVALS</Link>
            <Link href="/collections" className="hover:text-primary transition-colors">COLLECTIONS</Link>
            <Link href="/story" className="hover:text-primary transition-colors">OUR STORY</Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <Search size={20} />
          </button>
          <button 
            onClick={() => setIsProfileOpen(true)}
            className="p-2 hover:bg-white/5 rounded-full transition-colors relative"
          >
            <User size={20} />
          </button>
          <Link href="/cart" className="p-2 hover:bg-white/5 rounded-full transition-colors relative">
            <ShoppingCart size={20} />
            <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-[10px] flex items-center justify-center rounded-full">1</span>
          </Link>
          <button className="md:hidden p-2 hover:bg-white/5 rounded-full transition-colors">
            <Menu size={20} />
          </button>
        </div>
      </nav>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ProfileOverlay isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
}
