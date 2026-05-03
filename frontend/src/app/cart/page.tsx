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

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [paid, setPaid] = useState(false);

  useEffect(() => { setItems(getCart()); }, []);

  const updateQty = (id: number, size: string, qty: number) => {
    const cart = getCart().map(i => i.id === id && i.size === size ? {...i, quantity: qty} : i).filter(i => i.quantity > 0);
    saveCart(cart); setItems(cart);
  };
  const removeItem = (id: number, size: string) => {
    const cart = getCart().filter(i => !(i.id === id && i.size === size));
    saveCart(cart); setItems(cart);
  };

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  if (paid) return (
    <div style={{minHeight:"100vh",background:"#0a0a0a",paddingTop:80,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{background:"#111",border:"1px solid #222",borderRadius:24,padding:48,maxWidth:500,width:"100%",margin:"0 24px",textAlign:"center"}}>
        <div style={{fontSize:64,marginBottom:16}}>🎉</div>
        <h2 style={{fontFamily:"serif",fontSize:32,color:"#f5f5f5",marginBottom:8}}>Order Confirmed!</h2>
        <p style={{color:"#666",marginBottom:32}}>Thank you for your purchase. Your shoes are on their way!</p>
        <div style={{background:"#0a0a0a",borderRadius:16,padding:24,marginBottom:24,textAlign:"left"}}>
          <h3 style={{color:"#E8C97E",fontSize:14,letterSpacing:2,textTransform:"uppercase",marginBottom:16}}>Receipt</h3>
          {items.map(i => (
            <div key={`${i.id}-${i.size}`} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #1a1a1a",color:"#999",fontSize:13}}>
              <span>{i.name} (Size: {i.size}) x{i.quantity}</span>
              <span>${(i.price * i.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",color:"#666",fontSize:13}}><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",color:"#666",fontSize:13}}><span>Tax (10%)</span><span>${tax.toFixed(2)}</span></div>
          <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0",color:"#E8C97E",fontSize:18,fontWeight:700,borderTop:"1px solid #333",marginTop:4}}><span>Total Paid</span><span>${total.toFixed(2)}</span></div>
        </div>
        <Link href="/" onClick={() => { saveCart([]); }} style={{background:"#E8C97E",color:"#0a0a0a",padding:"14px 32px",borderRadius:30,fontWeight:700,fontSize:14,textDecoration:"none",display:"inline-block"}}>
          Continue Shopping
        </Link>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:"#0a0a0a",paddingTop:80}}>
      <div style={{maxWidth:900,margin:"0 auto",padding:"40px 24px"}}>
        <h1 style={{fontFamily:"serif",fontSize:48,fontWeight:900,color:"#f5f5f5",marginBottom:8}}>Your Bag</h1>
        <p style={{color:"#666",marginBottom:32}}>{totalItems} item{totalItems !== 1 ? "s" : ""}</p>

        {items.length === 0 ? (
          <div style={{textAlign:"center",padding:"80px 0"}}>
            <p style={{fontSize:64,marginBottom:16}}>🛍️</p>
            <p style={{color:"#666",fontSize:18,marginBottom:24}}>Your bag is empty</p>
            <Link href="/shop" style={{background:"#E8C97E",color:"#0a0a0a",padding:"14px 32px",borderRadius:30,fontWeight:700,fontSize:14,textDecoration:"none"}}>Shop Now</Link>
          </div>
        ) : (
          <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:32,alignItems:"start"}}>
            <div>
              {items.map(item => (
                <div key={`${item.id}-${item.size}`} style={{display:"flex",gap:16,padding:"20px 0",borderBottom:"1px solid #1a1a1a"}}>
                  <div style={{width:90,height:90,borderRadius:12,background:"linear-gradient(135deg,#1a1a1a,#222)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,flexShrink:0}}>👟</div>
                  <div style={{flex:1}}>
                    <p style={{color:"#666",fontSize:10,letterSpacing:2,textTransform:"uppercase"}}>{item.brand}</p>
                    <p style={{color:"#f5f5f5",fontSize:16,fontFamily:"serif",margin:"4px 0"}}>{item.name}</p>
                    <p style={{color:"#555",fontSize:12}}>Size: {item.size}</p>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:12}}>
                      <span style={{color:"#E8C97E",fontWeight:600,fontSize:16}}>${(item.price * item.quantity).toFixed(2)}</span>
                      <div style={{display:"flex",alignItems:"center",gap:12}}>
                        <div style={{display:"flex",alignItems:"center",gap:8,background:"#1a1a1a",borderRadius:20,padding:"4px 8px"}}>
                          <button onClick={() => updateQty(item.id, item.size, item.quantity - 1)} style={{width:28,height:28,borderRadius:"50%",border:"none",background:"#333",color:"#f5f5f5",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                          <span style={{color:"#f5f5f5",fontSize:14,minWidth:20,textAlign:"center"}}>{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, item.size, item.quantity + 1)} style={{width:28,height:28,borderRadius:"50%",border:"none",background:"#333",color:"#f5f5f5",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                        </div>
                        <button onClick={() => removeItem(item.id, item.size)} style={{background:"none",border:"none",color:"#ef4444",cursor:"pointer",fontSize:12}}>Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{background:"#111",border:"1px solid #222",borderRadius:20,padding:24,position:"sticky",top:80}}>
              <h3 style={{color:"#f5f5f5",fontFamily:"serif",fontSize:20,marginBottom:20}}>Order Summary</h3>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,color:"#666",fontSize:14}}><span>Subtotal ({totalItems} items)</span><span>${subtotal.toFixed(2)}</span></div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,color:"#666",fontSize:14}}><span>Shipping</span><span style={{color:"#22c55e"}}>Free</span></div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,color:"#666",fontSize:14}}><span>Tax (10%)</span><span>${tax.toFixed(2)}</span></div>
              <div style={{display:"flex",justifyContent:"space-between",padding:"16px 0",color:"#f5f5f5",fontSize:20,fontWeight:700,borderTop:"1px solid #333",marginTop:8,marginBottom:20}}><span>Total</span><span style={{color:"#E8C97E"}}>${total.toFixed(2)}</span></div>
              <button onClick={() => setPaid(true)} style={{width:"100%",background:"#E8C97E",color:"#0a0a0a",border:"none",borderRadius:30,padding:"16px",fontSize:16,fontWeight:700,cursor:"pointer",marginBottom:12}}>
                💳 Pay Now — ${total.toFixed(2)}
              </button>
              <Link href="/shop" style={{display:"block",textAlign:"center",color:"#666",fontSize:13,padding:"10px",border:"1px solid #333",borderRadius:30,textDecoration:"none"}}>Continue Shopping</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}