export default function StoryPage() {
  return (
    <div className="container mx-auto px-8 md:px-16 py-24 max-w-4xl">
      <h1 className="text-6xl font-black mb-8 tracking-tighter">Our Story</h1>
      <div className="space-y-8 text-white/60 text-lg leading-relaxed">
        <p>SoleStride was born from a simple obsession — the perfect shoe. Founded in 2020, we set out to bridge the gap between performance and style, creating footwear that works as hard as you do.</p>
        <p>Every pair we carry is carefully selected by our team of footwear experts who test each shoe for comfort, durability, and design. We partner with the world leading brands — Nike, Adidas, HOKA, Salomon — to bring you the best of the best.</p>
        <p>Our mission is simple: help you find the shoe that changes everything. Because the right pair does not just fit your foot — it fits your life.</p>
        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
          <div><p className="text-4xl font-black text-primary">12K+</p><p className="text-sm mt-1">Happy Customers</p></div>
          <div><p className="text-4xl font-black text-primary">500+</p><p className="text-sm mt-1">Styles Available</p></div>
          <div><p className="text-4xl font-black text-primary">4.9</p><p className="text-sm mt-1">Average Rating</p></div>
        </div>
      </div>
    </div>
  );
}