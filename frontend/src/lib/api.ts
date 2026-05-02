const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface Product {
  id: number; name: string; brand: string; category: string;
  price: number; old_price: number | null; description: string | null;
  image_url: string | null; badge: string | null;
  in_stock: boolean; rating: number; reviews: number;
}
export interface CartItem {
  id: number; product_id: number; quantity: number;
  size: string | null; product: Product;
}
export interface CartResponse {
  session_id: string; items: CartItem[];
  total_items: number; subtotal: number;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" }, ...options,
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

export const api = {
  getProducts: () => request<Product[]>("/products"),
  getProductsByCategory: (cat: string) => request<Product[]>(`/products/category/${cat}`),
  getCart: (sid: string) => request<CartResponse>(`/cart/${sid}`),
  addToCart: (sid: string, product_id: number, quantity = 1, size?: string) =>
    request<CartResponse>(`/cart/${sid}/add`, { method: "POST", body: JSON.stringify({ product_id, quantity, size }) }),
  updateCartItem: (sid: string, itemId: number, quantity: number) =>
    request<CartResponse>(`/cart/${sid}/update/${itemId}`, { method: "PUT", body: JSON.stringify({ quantity }) }),
  removeCartItem: (sid: string, itemId: number) =>
    request<CartResponse>(`/cart/${sid}/remove/${itemId}`, { method: "DELETE" }),
  clearCart: (sid: string) => request(`/cart/${sid}/clear`, { method: "DELETE" }),
  seedDatabase: () => request("/seed"),
};
