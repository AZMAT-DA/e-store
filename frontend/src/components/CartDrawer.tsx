"use client";
import { useCart } from "@/context/CartContext";
import { CartItem } from "@/lib/api";

export default function CartDrawer() {
  const { cart, isOpen, closeCart, removeItem, updateQty, clearCart } = useCart();
  return (
    <>
      {isOpen && <div onClick={closeCart} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:60}} />}
      <div style={{position:"fixed",top:0,right:0,height:"100vh",width:400,maxWidth:"100vw",background:"#0f0f0f",borderLeft:"1px solid #222",zIndex:70,display:"flex",flexDirection:"column",transform:isOpen?"translateX(0)":"translateX(100%)",transition:"transform 0.35s cubic-bezier(0.4,0,0.2,1)"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"20px 24px",borderBottom:"1px solid #222",background:"rgba(255,255,255,0.03)"}}>
          <div>
            <h2 style={{color:"#f5f5f5",fontFamily:"serif",fontSize:20,fontWeight:400}}>Your Bag</h2>
            <p style={{color:"#666",fontSize:12,marginTop:2}}>{cart?.total_items ?? 0} items</p>
          </div>
          <button onClick={closeCart} style={{background:"none",border:"1px solid #333",color:"#666",width:36,height:36,borderRadius:"50%",cursor:"pointer",fontSize:16}}>✕</button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"16px 24px"}}>
          {!cart || cart.items.length === 0 ? (
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",color:"#444",gap:12}}>
              <span style={{fontSize:56}}>🛍️</span>
              <p>Your bag is empty</p>
              <button onClick={closeCart} style={{background:"#E8C97E",color:"#0a0a0a",border:"none",borderRadius:20,padding:"10px 24px",fontSize:13,fontWeight:600,cursor:"pointer",marginTop:8}}>Shop Now</button>
            </div>
          ) : cart.items.map((item: CartItem) => (
            <div key={item.id} style={{display:"flex",gap:12,padding:"16px 0",borderBottom:"1px solid #1a1a1a"}}>
              <div style={{width:72,height:72,borderRadius:12,background:"#1a1a1a",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0}}>👟</div>
              <div style={{flex:1}}>
                <p style={{color:"#666",fontSize:10,letterSpacing:2}}>{item.product.brand}</p>
                <p style={{color:"#f5f5f5",fontSize:14,fontFamily:"serif",margin:"2px 0"}}>{item.product.name}</p>
                {item.size && <p style={{color:"#555",fontSize:11}}>Size: {item.size}</p>}
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:8}}>
                  <span style={{color:"#E8C97E",fontWeight:500}}>${(item.product.price*item.quantity).toFixed(2)}</span>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{display:"flex",alignItems:"center",gap:4,background:"rgba(255,255,255,0.05)",borderRadius:20,padding:"2px 4px"}}>
                      <button onClick={() => updateQty(item.id, item.quantity-1)} style={{width:24,height:24,borderRadius:"50%",border:"none",background:"none",color:"#f5f5f5",cursor:"pointer",fontSize:14}}>−</button>
                      <span style={{color:"#f5f5f5",fontSize:13,minWidth:16,textAlign:"center"}}>{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, item.quantity+1)} style={{width:24,height:24,borderRadius:"50%",border:"none",background:"none",color:"#f5f5f5",cursor:"pointer",fontSize:14}}>+</button>
                    </div>
                    <button onClick={() => removeItem(item.id)} style={{background:"none",border:"none",color:"#555",cursor:"pointer",fontSize:12}}>✕</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart && cart.items.length > 0 && (
          <div style={{padding:"20px 24px",borderTop:"1px solid #222",background:"#0d0d0d"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,color:"#666",fontSize:13}}><span>Subtotal</span><span>${cart.subtotal.toFixed(2)}</span></div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:16,color:"#666",fontSize:13}}><span>Shipping</span><span style={{color:"#22c55e"}}>Free</span></div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:20,color:"#f5f5f5",fontSize:18,fontWeight:500,paddingTop:12,borderTop:"1px solid #222"}}><span>Total</span><span style={{color:"#E8C97E"}}>${cart.subtotal.toFixed(2)}</span></div>
            <button style={{width:"100%",background:"#E8C97E",color:"#0a0a0a",border:"none",borderRadius:30,padding:"14px",fontSize:14,fontWeight:600,cursor:"pointer",marginBottom:8}}>Proceed to Checkout →</button>
            <button onClick={closeCart} style={{width:"100%",background:"none",color:"#666",border:"1px solid #333",borderRadius:30,padding:"10px",fontSize:13,cursor:"pointer"}}>Continue Shopping</button>
            <button onClick={clearCart} style={{width:"100%",background:"none",border:"none",color:"#444",fontSize:11,cursor:"pointer",marginTop:8,padding:"4px"}}>Clear Bag</button>
          </div>
        )}
      </div>
    </>
  );
}
