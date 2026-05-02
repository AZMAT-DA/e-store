"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cart, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const totalItems = cart?.total_items ?? 0;
  return (
    <header style={{position:"fixed",top:0,left:0,right:0,zIndex:50,background:"rgba(10,10,10,0.8)",backdropFilter:"blur(20px)",borderBottom:"1px solid #222"}}>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <a href="/" style={{fontFamily:"serif",fontSize:22,letterSpacing:4,color:"#f5f5f5",textDecoration:"none"}}>
          SOLE<span style={{color:"#E8C97E"}}>STRIDE</span>
        </a>
        <nav style={{display:"flex",gap:32}}>
          {["Shop","New Arrivals","Collections","Our Story"].map(l => (
            <a key={l} href="#" style={{color:"#666",fontSize:13,letterSpacing:2,textDecoration:"none"}}>{l}</a>
          ))}
        </nav>
        <button onClick={openCart} style={{position:"relative",background:"#E8C97E",color:"#0a0a0a",border:"none",borderRadius:30,padding:"8px 20px",fontSize:13,fontWeight:500,cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
          🛍 Bag
          {totalItems > 0 && (
            <span style={{position:"absolute",top:-8,right:-8,background:"#0a0a0a",color:"#E8C97E",borderRadius:"50%",width:20,height:20,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid #E8C97E"}}>
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
