export default function StoryPage() {
  return (
    <div style={{minHeight:"100vh",background:"#0a0a0a",paddingTop:80}}>
      <div style={{maxWidth:800,margin:"0 auto",padding:"40px 24px"}}>
        <p style={{color:"#E8C97E",fontSize:11,letterSpacing:4,textTransform:"uppercase",marginBottom:12}}>Who We Are</p>
        <h1 style={{fontFamily:"serif",fontSize:56,fontWeight:900,color:"#f5f5f5",marginBottom:40,lineHeight:1.1}}>Our Story</h1>
        <div style={{display:"flex",flexDirection:"column",gap:24,color:"#999",fontSize:17,lineHeight:1.8}}>
          <p>SoleStride was born from a simple obsession — the perfect shoe. Founded in 2020, we set out to bridge the gap between performance and style, creating footwear that works as hard as you do.</p>
          <p>Every pair we carry is carefully selected by our team of footwear experts who test each shoe for comfort, durability, and design. We partner with the worlds leading brands — Nike, Adidas, HOKA, Salomon — to bring you the best of the best.</p>
          <p>Our mission is simple: help you find the shoe that changes everything. Because the right pair does not just fit your foot — it fits your life.</p>
          <p>From the streets of Lahore to the trails of the Himalayas, SoleStride is with you every step of the way.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24,marginTop:48,paddingTop:32,borderTop:"1px solid #222"}}>
          {[["12K+","Happy Customers"],["500+","Styles Available"],["4.9★","Average Rating"]].map(([num,label]) => (
            <div key={label} style={{textAlign:"center"}}>
              <p style={{fontSize:36,fontWeight:900,color:"#E8C97E",fontFamily:"serif"}}>{num}</p>
              <p style={{color:"#666",fontSize:13,marginTop:4}}>{label}</p>
            </div>
          ))}
        </div>
        <div style={{marginTop:48,padding:32,background:"#111",borderRadius:16,border:"1px solid #222"}}>
          <h3 style={{color:"#f5f5f5",fontFamily:"serif",fontSize:24,marginBottom:16}}>Why Choose Us?</h3>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {[["🚚","Free Shipping","On all orders over $150 — worldwide"],["↩️","30-Day Returns","Easy returns if the fit is not perfect"],["✅","Authentic Only","100% genuine products, guaranteed"],["💬","24/7 Support","Our team is always here to help"]].map(([icon,title,desc]) => (
              <div key={title} style={{display:"flex",gap:16,alignItems:"flex-start"}}>
                <span style={{fontSize:24}}>{icon}</span>
                <div>
                  <p style={{color:"#f5f5f5",fontWeight:600,fontSize:14}}>{title}</p>
                  <p style={{color:"#666",fontSize:13}}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}