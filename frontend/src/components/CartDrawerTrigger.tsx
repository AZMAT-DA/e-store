"use client";
import { useState, useEffect } from "react";

function getCartCount() {
  if (typeof window === "undefined") return 0;
  try {
    const cart = JSON.parse(localStorage.getItem("solestride_cart") || "[]");
    return cart.reduce((s: number, i: any) => s + i.quantity, 0);
  } catch { return 0; }
}

export default function CartDrawerTrigger() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(getCartCount());
    const update = () => setCount(getCartCount());
    window.addEventListener("cartUpdated", update);
    return () => window.removeEventListener("cartUpdated", update);
  }, []);

  return (
    <button onClick={() => window.dispatchEvent(new Event("openCart"))}
      style={{position:"relative",background:"#E8C97E",color:"#0a0a0a",border:"none",borderRadius:30,padding:"8px 20px",fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
      🛍 Bag
      {count > 0 && (
        <span style={{position:"absolute",top:-8,right:-8,background:"#0a0a0a",color:"#E8C97E",borderRadius:"50%",width:22,height:22,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid #E8C97E"}}>
          {count}
        </span>
      )}
    </button>
  );
}