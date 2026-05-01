import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";

const FEATURED_PRODUCTS = [
  { id: 1, name: "Neon Velocity X", price: 159, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", category: "Runners" },
  { id: 2, name: "Midnight Obsidian", price: 189, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772", category: "Formal" },
  { id: 3, name: "Crimson Blaze", price: 129, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa", category: "Streetwear" },
  { id: 4, name: "Aero Glow Alpha", price: 199, image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d", category: "Sport" },
];

export default function Home() {
  return (
    <div className="pb-20">
      <Hero />
      
      <section className="container mx-auto px-8 md:px-16 pt-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black tracking-tighter mb-2">FEATURED DROPS</h2>
            <div className="h-1 w-20 bg-primary" />
          </div>
          <button className="text-sm font-bold border-b border-primary text-primary pb-1">VIEW ALL</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* Brand Section */}
      <section className="container mx-auto px-8 md:px-16 pt-32">
        <div className="glass-card p-12 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full -z-10" />
          <div className="md:w-1/2">
            <h2 className="text-5xl font-black mb-6 leading-tight">THE ART OF <br />PRECISION.</h2>
            <p className="text-white/50 mb-8 max-w-md">
              Every curve, every stitch, and every material is selected with obsessive care. Our shoes aren't just footwear; they are an extension of your ambition.
            </p>
            <button className="px-8 py-3 bg-white text-black rounded-lg font-bold">READ OUR STORY</button>
          </div>
          <div className="md:w-1/2">
             <img 
               src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a" 
               alt="Shoe detail" 
               className="rounded-2xl shadow-2xl"
             />
          </div>
        </div>
      </section>
    </div>
  );
}
