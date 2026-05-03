"use client";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";

const ALL_PRODUCTS = [
  { id: 1, name: "Air Phantom X", brand: "Nike", category: "men", price: 189.99, old_price: 229.99, description: "Lightweight running shoe.", image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", badge: "Sale", in_stock: true, rating: 4.8, reviews: 342 },
  { id: 2, name: "Velocity Pro", brand: "Adidas", category: "men", price: 210.00, old_price: null, description: "Performance training shoe.", image_url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500", badge: "New", in_stock: true, rating: 4.9, reviews: 128 },
  { id: 3, name: "Cloud Stride", brand: "HOKA", category: "women", price: 165.00, old_price: null, description: "Maximum cushioning.", image_url: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500", badge: null, in_stock: true, rating: 4.7, reviews: 215 },
  { id: 4, name: "Urban Edge", brand: "New Balance", category: "women", price: 140.00, old_price: 175.00, description: "Stylish sneaker.", image_url: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500", badge: "Sale", in_stock: true, rating: 4.6, reviews: 89 },
  { id: 5, name: "Trail Blazer GTX", brand: "Salomon", category: "men", price: 245.00, old_price: null, description: "Gore-Tex trail runner.", image_url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500", badge: "New", in_stock: true, rating: 4.9, reviews: 67 },
  { id: 6, name: "Puma Drift", brand: "Puma", category: "women", price: 119.99, old_price: 149.99, description: "Sleek casual sneaker.", image_url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500", badge: "Sale", in_stock: true, rating: 4.5, reviews: 193 },
  { id: 7, name: "Mini Runner", brand: "Skechers", category: "kids", price: 69.99, old_price: null, description: "Fun sneakers for kids.", image_url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500", badge: "New", in_stock: true, rating: 4.7, reviews: 301 },
  { id: 8, name: "Classic Court", brand: "Converse", category: "kids", price: 55.00, old_price: 65.00, description: "Timeless canvas shoe.", image_url: "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=500", badge: "Sale", in_stock: true, rating: 4.8, reviews: 512 },
];

export default function HomePage() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? ALL_PRODUCTS : ALL_PRODUCTS.filter(p => p.category === filter);
  return (
    <div style={{minHeight:"100vh",background:"#0a0a0a"}}>
      <section style={{padding:"120px 48px 60px",textAlign:"center",borderBottom:"1px solid #1a1a1a",background:"linear-gradient(135deg,#0a0a0a 0%,#111 100%)"}}>
        <p style={{color:"#E8C97E",fontSize:11,letterSpacing:6,textTransform:"uppercase",marginBottom:16}}>Summer Collection 2025</p>
        <h1 style={{fontFamily:"serif",fontSize:"clamp(2.5rem,6vw,5rem)",fontWeight:900,color:"#f5f5f5",lineHeight:1.1,marginBottom:16}}>
          Step Into <em style={{color:"#E8C97E",fontStyle:"italic"}}>Extraordinary</em>
        </h1>
        <p style={{color:"#666",fontSize:18,maxWidth:480,margin:"0 auto 32px"}}>Premium footwear engineered for the relentless.</p>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          <a href="/shop" style={{background:"#E8C97E",color:"#0a0a0a",padding:"14px 32px",borderRadius:30,fontWeight:700,fontSize:14,textDecoration:"none"}}>Shop Now</a>
          <a href="/new" style={{background:"transparent",color:"#f5f5f5",padding:"14px 32px",borderRadius:30,fontWeight:700,fontSize:14,textDecoration:"none",border:"1px solid #333"}}>New Arrivals</a>
        </div>
      </section>
      <section style={{maxWidth:1200,margin:"0 auto",padding:"60px 24px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:40,flexWrap:"wrap",gap:16}}>
          <h2 style={{fontFamily:"serif",fontSize:32,fontWeight:900,color:"#f5f5f5"}}>Our Collection</h2>
          <div style={{display:"flex",gap:8}}>
            {["all","men","women","kids"].map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                style={{padding:"8px 20px",borderRadius:30,fontSize:13,fontWeight:600,textTransform:"capitalize",cursor:"pointer",border:"1px solid",borderColor:filter===cat?"transparent":"#333",background:filter===cat?"#E8C97E":"transparent",color:filter===cat?"#0a0a0a":"#666",transition:"all 0.2s"}}>
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:24}}>
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
      <footer style={{textAlign:"center",padding:"40px",borderTop:"1px solid #1a1a1a",color:"#444",fontSize:13}}>
        <p>© 2025 <span style={{color:"#E8C97E"}}>SOLESTRIDE</span> — Premium Footwear</p>
      </footer>
    </div>
  );
}