"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface CartItem { id: number; name: string; brand: string; price: number; size: string; quantity: number; }

function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("solestride_cart") || "[]"); } catch { return []; }
}
function saveCart(cart: CartItem[]) {
  localStorage.setItem("solestride_cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
}

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  const loadCart = () => setItems(getCart());

  useEffect(() => {
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    window.addEventListener("openCart", () => setIsOpen(true));
    return () => { window.removeEventListener("cartUpdated", loadCart); };
  }, []);

  const removeItem = (id: number, size: string) => { const c = getCart().filter(i => !(i.id === id && i.size === size)); saveCart(c); setItems(c); };
  const updateQty = (id: number, size: string, qty: number) => { const c = getCart().map(i => i.id === id && i.size === size ? {...i, quantity: qty} : i).filter(i => i.quantity > 0); saveCart(c); setItems(c); };
  const clearCart = () => { saveCart([]); setItems([]); };

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <>
      {isOpen && <div onClick={() => setIsOpen(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:60}} />}
      <div style={{position:"fixed",top:0,right:0,height:"100vh",width:420,maxWidth:"100vw",background:"#0f0f0f",borderLeft:"1px solid #222",zIndex:70,display:"flex",flexDirection:"column",transform:isOpen?"translateX(0)":"translateX(100%)",transition:"transform 0.35s cubic-bezier(0.4,0,0.2,1)"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"20px 24px",borderBottom:"1px solid #222",background:"rgba(255,255,255,0.02)"}}>
          <div>
            <h2 style={{color:"#f5f5f5",fontFamily:"serif",fontSize:22,fontWeight:400}}>Your Bag</h2>
            <p style={{color:"#666",fontSize:12,marginTop:2}}>{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
          </div>
          <button onClick={() => setIsOpen(false)} style={{background:"none",border:"1px solid #333",color:"#666",width:36,height:36,borderRadius:"50%",cursor:"pointer",fontSize:16}}>✕</button>
        </div>

        <div style={{flex:1,overflowY:"auto",padding:"16px 24px"}}>
          {items.length === 0 ? (
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",color:"#444",gap:12,textAlign:"center"}}>
              <span style={{fontSize:56}}>🛍️</span>
              <p style={{fontSize:16}}>Your bag is empty</p>
              <p style={{fontSize:13,color:"#333"}}>Add some shoes to get started!</p>
              <button onClick={() => setIsOpen(false)} style={{background:"#E8C97E",color:"#0a0a0a",border:"none",borderRadius:20,padding:"10px 24px",fontSize:13,fontWeight:600,cursor:"pointer",marginTop:8}}>Shop Now</button>
            </div>
          ) : items.map(item => (
            <div key={`${item.id}-${item.size}`} style={{display:"flex",gap:12,padding:"16px 0",borderBottom:"1px solid #1a1a1a"}}>
              <div style={{width:72,height:72,borderRadius:12,background:"linear-gradient(135deg,#1a1a1a,#222)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0}}>👟</div>
              <div style={{flex:1}}>
                <p style={{color:"#666",fontSize:10,letterSpacing:2,textTransform:"uppercase"}}>{item.brand}</p>
                <p style={{color:"#f5f5f5",fontSize:14,fontFamily:"serif",margin:"2px 0"}}>{item.name}</p>
                <p style={{color:"#555",fontSize:11}}>Size: {item.size}</p>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:8}}>
                  <span style={{color:"#E8C97E",fontWeight:500}}>${(item.price * item.quantity).toFixed(2)}</span>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{display:"flex",alignItems:"center",gap:4,background:"rgba(255,255,255,0.05)",borderRadius:20,padding:"2px 6px"}}>
                      <button onClick={() => updateQty(item.id, item.size, item.quantity - 1)} style={{width:24,height:24,borderRadius:"50%",border:"none",background:"none",color:"#f5f5f5",cursor:"pointer",fontSize:16}}>−</button>
                      <span style={{color:"#f5f5f5",fontSize:13,minWidth:16,textAlign:"center"}}>{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, item.size, item.quantity + 1)} style={{width:24,height:24,borderRadius:"50%",border:"none",background:"none",color:"#f5f5f5",cursor:"pointer",fontSize:16}}>+</button>
                    </div>
                    <button onClick={() => removeItem(item.id, item.size)} style={{background:"none",border:"none",color:"#ef4444",cursor:"pointer",fontSize:11}}>Remove</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div style={{padding:"20px 24px",borderTop:"1px solid #222",background:"#0d0d0d"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,color:"#666",fontSize:13}}><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:16,color:"#666",fontSize:13}}><span>Shipping</span><span style={{color:"#22c55e"}}>Free</span></div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:20,color:"#f5f5f5",fontSize:20,fontWeight:700,paddingTop:12,borderTop:"1px solid #333"}}><span>Total</span><span style={{color:"#E8C97E"}}>${subtotal.toFixed(2)}</span></div>
            <Link href="/cart" onClick={() => setIsOpen(false)} style={{display:"block",width:"100%",background:"#E8C97E",color:"#0a0a0a",border:"none",borderRadius:30,padding:"14px",fontSize:14,fontWeight:700,cursor:"pointer",marginBottom:8,textAlign:"center",textDecoration:"none"}}>
              💳 View Bag & Pay
            </Link>
            <button onClick={() => setIsOpen(false)} style={{width:"100%",background:"none",color:"#666",border:"1px solid #333",borderRadius:30,padding:"10px",fontSize:13,cursor:"pointer",marginBottom:8}}>Continue Shopping</button>
            <button onClick={clearCart} style={{width:"100%",background:"none",border:"none",color:"#444",fontSize:11,cursor:"pointer",padding:"4px"}}>Clear Bag</button>
          </div>
        )}
      </div>

      {/* Bag button always visible */}
      <button onClick={() => setIsOpen(true)}
        style={{position:"fixed",top:14,right:24,zIndex:100,background:"#E8C97E",color:"#0a0a0a",border:"none",borderRadius:30,padding:"10px 22px",fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:8,boxShadow:"0 4px 20px rgba(232,201,126,0.3)"}}>
        🛍 Bag
        {totalItems > 0 && (
          <span style={{background:"#0a0a0a",color:"#E8C97E",borderRadius:"50%",width:22,height:22,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid #E8C97E"}}>
            {totalItems}
          </span>
        )}
      </button>
    </>
  );
}