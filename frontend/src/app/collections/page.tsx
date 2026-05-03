"use client";
import ProductCard from "@/components/ProductCard";
import { ALL_PRODUCTS } from "@/lib/products";

export default function CollectionsPage() {
  const collections = ALL_PRODUCTS.slice(0, 4);
  return (
    <div style={{minHeight:"100vh",background:"#0a0a0a",paddingTop:80}}>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"40px 24px"}}>
        <p style={{color:"#E8C97E",fontSize:11,letterSpacing:4,textTransform:"uppercase",marginBottom:12}}>Handpicked</p>
        <h1 style={{fontFamily:"serif",fontSize:48,fontWeight:900,color:"#f5f5f5",marginBottom:8}}>Collections</h1>
        <p style={{color:"#666",marginBottom:40}}>Curated for every lifestyle and occasion.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:24}}>
          {collections.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}