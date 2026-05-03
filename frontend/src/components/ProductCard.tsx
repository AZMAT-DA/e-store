"use client";
import { useState } from "react";
import { Product } from "@/lib/api";

const SIZES = ["UK 6","UK 7","UK 8","UK 9","UK 10","UK 11"];

function addToLocalCart(product: Product, size: string) {
  const cart = JSON.parse(localStorage.getItem("solestride_cart") || "[]");
  const existing = cart.find((i: any) => i.id === product.id && i.size === size);
  if (existing) { existing.quantity += 1; }
  else { cart.push({ id: product.id, name: product.name, price: product.price, brand: product.brand, size, quantity: 1 }); }
  localStorage.setItem("solestride_cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
}

export default function ProductCard({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string|null>(null);
  const [showSizes, setShowSizes] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!showSizes) { setShowSizes(true); return; }
    if (!selectedSize) return;
    addToLocalCart(product, selectedSize);
    setAdded(true);
    setShowSizes(false);
    setSelectedSize(null);
    setTimeout(() => setAdded(false), 2500);
    window.dispatchEvent(new Event("openCart"));
  };

  const imageUrl = product.image_url || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500";

  return (
    <div style={{background:"#111",border:"1px solid #222",borderRadius:16,overflow:"hidden",position:"relative",transition:"transform 0.2s,box-shadow 0.2s"}}>
      {product.badge && (
        <span style={{position:"absolute",top:12,left:12,background:product.badge==="Sale"?"#ef4444":"#E8C97E",color:product.badge==="Sale"?"#fff":"#0a0a0a",fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:20,zIndex:2,letterSpacing:2}}>
          {product.badge}
        </span>
      )}
      <div style={{aspectRatio:"4/3",overflow:"hidden",background:"#1a1a1a"}}>
        <img src={imageUrl} alt={product.name}
          style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.4s"}}
          onMouseOver={e => (e.currentTarget.style.transform="scale(1.08)")}
          onMouseOut={e => (e.currentTarget.style.transform="scale(1)")}
        />
      </div>
      <div style={{padding:16}}>
        <p style={{color:"#666",fontSize:10,letterSpacing:3,textTransform:"uppercase",marginBottom:4}}>{product.brand}</p>
        <h3 style={{color:"#f5f5f5",fontSize:15,fontFamily:"serif",marginBottom:4}}>{product.name}</h3>
        <p style={{color:"#E8C97E",fontSize:11,marginBottom:12}}>{"★".repeat(Math.round(product.rating))}{"☆".repeat(5-Math.round(product.rating))} ({product.reviews})</p>
        {showSizes && (
          <div style={{marginBottom:12,background:"#0a0a0a",borderRadius:12,padding:12}}>
            <p style={{color:"#666",fontSize:10,letterSpacing:2,marginBottom:8,textTransform:"uppercase"}}>Select Size</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>
              {SIZES.map(s => (
                <button key={s} onClick={() => setSelectedSize(s)}
                  style={{padding:"8px 4px",fontSize:11,borderRadius:8,border:`1px solid ${selectedSize===s?"#E8C97E":"#333"}`,background:selectedSize===s?"rgba(232,201,126,0.15)":"transparent",color:selectedSize===s?"#E8C97E":"#666",cursor:"pointer",fontWeight:selectedSize===s?700:400}}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
          <div>
            <span style={{color:"#f5f5f5",fontSize:18,fontWeight:700}}>${product.price}</span>
            {product.old_price && <span style={{color:"#555",fontSize:13,textDecoration:"line-through",marginLeft:8}}>${product.old_price}</span>}
          </div>
          <button onClick={handleAdd} disabled={showSizes && !selectedSize}
            style={{background:added?"#22c55e":showSizes&&!selectedSize?"#333":"#E8C97E",color:added?"#fff":showSizes&&!selectedSize?"#555":"#0a0a0a",border:"none",borderRadius:20,padding:"10px 16px",fontSize:12,fontWeight:700,cursor:showSizes&&!selectedSize?"not-allowed":"pointer",transition:"all 0.2s",whiteSpace:"nowrap"}}>
            {added ? "✓ Added to Bag!" : showSizes ? (selectedSize ? "✓ Confirm" : "Pick Size") : "+ Add to Bag"}
          </button>
        </div>
        {added && (
          <div style={{marginTop:8,padding:"8px 12px",background:"rgba(34,197,94,0.1)",border:"1px solid rgba(34,197,94,0.3)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span style={{color:"#22c55e",fontSize:12}}>✓ Added to your bag!</span>
            <a href="/cart" style={{color:"#E8C97E",fontSize:11,textDecoration:"none",fontWeight:600}}>View Bag →</a>
          </div>
        )}
      </div>
    </div>
  );
}