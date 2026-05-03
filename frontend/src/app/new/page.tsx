"use client";
import ProductCard from "@/components/ProductCard";
import { ALL_PRODUCTS } from "@/lib/products";

export default function NewArrivalsPage() {
  const newProducts = ALL_PRODUCTS.slice(0, 3);
  return (
    <div style={{minHeight:"100vh",background:"#0a0a0a",paddingTop:80}}>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"40px 24px"}}>
        <p style={{color:"#E8C97E",fontSize:11,letterSpacing:4,textTransform:"uppercase",marginBottom:12}}>Just Landed</p>
        <h1 style={{fontFamily:"serif",fontSize:48,fontWeight:900,color:"#f5f5f5",marginBottom:8}}>New Arrivals</h1>
        <p style={{color:"#666",marginBottom:40}}>The freshest styles, just dropped.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:24}}>
          {newProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}