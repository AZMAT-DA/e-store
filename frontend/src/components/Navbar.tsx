"use client";
import Link from "next/link";
import CartDrawerTrigger from "./CartDrawerTrigger";

export default function Navbar() {
  return (
    <header style={{position:"fixed",top:0,left:0,right:0,zIndex:50,background:"rgba(10,10,10,0.95)",backdropFilter:"blur(20px)",borderBottom:"1px solid #1a1a1a"}}>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <Link href="/" style={{fontFamily:"serif",fontSize:22,letterSpacing:4,color:"#f5f5f5",textDecoration:"none"}}>
          SOLE<span style={{color:"#E8C97E"}}>STRIDE</span>
        </Link>
        <nav style={{display:"flex",gap:32}}>
          <Link href="/shop" style={{color:"#999",fontSize:13,letterSpacing:2,textDecoration:"none"}}>Shop</Link>
          <Link href="/new" style={{color:"#999",fontSize:13,letterSpacing:2,textDecoration:"none"}}>New Arrivals</Link>
          <Link href="/collections" style={{color:"#999",fontSize:13,letterSpacing:2,textDecoration:"none"}}>Collections</Link>
          <Link href="/story" style={{color:"#999",fontSize:13,letterSpacing:2,textDecoration:"none"}}>Our Story</Link>
        </nav>
        <CartDrawerTrigger />
      </div>
    </header>
  );
}