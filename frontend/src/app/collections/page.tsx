"use client";
import ProductCard from "@/components/ProductCard";

const COLLECTIONS = [
  { id: 1, name: "Air Phantom X", brand: "Nike", category: "men", price: 189.99, old_price: 229.99, description: "Lightweight running shoe.", image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", badge: "Sale", in_stock: true, rating: 4.8, reviews: 342 },
  { id: 2, name: "Velocity Pro", brand: "Adidas", category: "men", price: 210.00, old_price: null, description: "Performance training shoe.", image_url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500", badge: "New", in_stock: true, rating: 4.9, reviews: 128 },
  { id: 3, name: "Cloud Stride", brand: "HOKA", category: "women", price: 165.00, old_price: null, description: "Maximum cushioning.", image_url: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500", badge: null, in_stock: true, rating: 4.7, reviews: 215 },
  { id: 4, name: "Urban Edge", brand: "New Balance", category: "women", price: 140.00, old_price: 175.00, description: "Stylish sneaker.", image_url: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500", badge: "Sale", in_stock: true, rating: 4.6, reviews: 89 },
  { id: 5, name: "Trail Blazer GTX", brand: "Salomon", category: "men", price: 245.00, old_price: null, description: "Gore-Tex trail runner.", image_url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500", badge: "New", in_stock: true, rating: 4.9, reviews: 67 },
  { id: 6, name: "Puma Drift", brand: "Puma", category: "women", price: 119.99, old_price: 149.99, description: "Sleek casual sneaker.", image_url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500", badge: "Sale", in_stock: true, rating: 4.5, reviews: 193 },
];

export default function CollectionsPage() {
  return (
    <div className="container mx-auto px-8 md:px-16 py-24">
      <h1 className="text-6xl font-black mb-4 tracking-tighter">Collections</h1>
      <p className="text-white/40 mb-16">Curated for every lifestyle.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {COLLECTIONS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}