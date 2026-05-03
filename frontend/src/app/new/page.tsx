"use client";
import ProductCard from "@/components/ProductCard";

const NEW_PRODUCTS = [
  { id: 101, name: "Air Phantom X", brand: "Nike", category: "men", price: 189.99, old_price: 229.99, description: "Lightweight running shoe.", image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", badge: "New", in_stock: true, rating: 4.8, reviews: 342 },
  { id: 102, name: "Velocity Pro", brand: "Adidas", category: "men", price: 210.00, old_price: null, description: "Performance training shoe.", image_url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500", badge: "New", in_stock: true, rating: 4.9, reviews: 128 },
  { id: 103, name: "Cloud Stride", brand: "HOKA", category: "women", price: 165.00, old_price: null, description: "Maximum cushioning.", image_url: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500", badge: "New", in_stock: true, rating: 4.7, reviews: 215 },
];

export default function NewArrivalsPage() {
  return (
    <div className="container mx-auto px-8 md:px-16 py-24">
      <h1 className="text-6xl font-black mb-4 tracking-tighter">New Arrivals</h1>
      <p className="text-white/40 mb-16">The latest drops, just landed.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {NEW_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}