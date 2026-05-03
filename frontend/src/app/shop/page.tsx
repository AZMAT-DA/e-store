"use client";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { ALL_PRODUCTS } from "@/lib/products";

export default function ShopPage() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? ALL_PRODUCTS : ALL_PRODUCTS.filter(p => p.category === filter);
  return (
    <div style={{minHeight:"100vh",background:"#0a0a0a",paddingTop:80}}>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"40px 24px"}}>
        <h1 style={{fontFamily:"serif",fontSize:48,fontWeight:900,color:"#f5f5f5",marginBottom:8}}>Shop</h1>
        <p style={{color:"#666",marginBottom:32}}>All styles, all sizes — {filtered.length} products</p>
        <div style={{display:"flex",gap:8,marginBottom:32,flexWrap:"wrap"}}>
          {["all","men","women","kids"].map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              style={{padding:"8px 20px",borderRadius:30,fontSize:13,fontWeight:600,textTransform:"capitalize",cursor:"pointer",border:"1px solid",borderColor:filter===cat?"transparent":"#333",background:filter===cat?"#E8C97E":"transparent",color:filter===cat?"#0a0a0a":"#666",transition:"all 0.2s"}}>
              {cat}
            </button>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:24}}>
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}