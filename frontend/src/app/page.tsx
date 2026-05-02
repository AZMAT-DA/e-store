"use client";
import { useEffect, useState } from "react";
import { api, Product } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try { await api.seedDatabase(); const data = await api.getProducts(); setProducts(data); }
      catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  const filtered = filter === "all" ? products : products.filter(p => p.category === filter);

  return (
    <div style={{minHeight:"100vh",background:"#0a0a0a"}}>
      <section style={{padding:"80px 48px 40px",textAlign:"center",borderBottom:"1px solid #1a1a1a"}}>
        <p style={{color:"#E8C97E",fontSize:11,letterSpacing:6,textTransform:"uppercase",marginBottom:16}}>Summer Collection 2025</p>
        <h1 style={{fontFamily:"serif",fontSize:56,fontWeight:400,color:"#f5f5f5",lineHeight:1.1,marginBottom:16}}>
          Step Into <em style={{color:"#E8C97E"}}>Extraordinary</em>
        </h1>
        <p style={{color:"#666",fontSize:16,maxWidth:480,margin:"0 auto"}}>Premium footwear engineered for the relentless.</p>
      </section>

      <section style={{maxWidth:1200,margin:"0 auto",padding:"40px 24px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:32,flexWrap:"wrap",gap:16}}>
          <h2 style={{fontFamily:"serif",fontSize:28,fontWeight:400,color:"#f5f5f5"}}>Our Collection</h2>
          <div style={{display:"flex",gap:8}}>
            {["all","men","women","kids"].map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                style={{padding:"8px 20px",borderRadius:30,fontSize:13,fontWeight:500,textTransform:"capitalize",cursor:"pointer",border:"1px solid",borderColor:filter===cat?"transparent":"#333",background:filter===cat?"#E8C97E":"transparent",color:filter===cat?"#0a0a0a":"#666",transition:"all 0.2s"}}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:24}}>
            {[...Array(8)].map((_,i) => <div key={i} style={{height:320,borderRadius:16,background:"#111"}} />)}
          </div>
        ) : (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:24}}>
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{textAlign:"center",padding:"80px 0",color:"#444"}}>
            <p style={{fontSize:48,marginBottom:16}}>👟</p>
            <p>No products found. Make sure backend is running and visit http://localhost:8000/seed</p>
          </div>
        )}
      </section>
    </div>
  );
}
