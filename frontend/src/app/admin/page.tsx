"use client";
import { useState, useEffect } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface Product {
  id: number; name: string; brand: string; category: string;
  price: number; old_price: number | null; description: string;
  image_url: string; badge: string | null; in_stock: boolean;
  rating: number; reviews: number;
}

const EMPTY: Omit<Product, "id"> = {
  name: "", brand: "", category: "men", price: 0, old_price: null,
  description: "", image_url: "", badge: null, in_stock: true, rating: 4.5, reviews: 0
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Omit<Product,"id">>(EMPTY);
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API}/products`);
      const data = await res.json();
      setProducts(data);
    } catch { setMsg("Cannot connect to backend API"); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const showMsg = (m: string) => { setMsg(m); setTimeout(() => setMsg(""), 3000); };

  const handleSubmit = async () => {
    if (!form.name || !form.brand || !form.price) {
      showMsg("Please fill Name, Brand and Price!"); return;
    }
    setLoading(true);
    try {
      const url = editId ? `${API}/products/${editId}` : `${API}/products`;
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: Number(form.price), old_price: form.old_price ? Number(form.old_price) : null })
      });
      if (res.ok) {
        showMsg(editId ? "Product updated!" : "Product created!");
        setForm(EMPTY); setEditId(null); setShowForm(false);
        fetchProducts();
      }
    } catch { showMsg("Error saving product"); }
    setLoading(false);
  };

  const handleEdit = (p: Product) => {
    setForm({ name: p.name, brand: p.brand, category: p.category, price: p.price,
      old_price: p.old_price, description: p.description, image_url: p.image_url,
      badge: p.badge, in_stock: p.in_stock, rating: p.rating, reviews: p.reviews });
    setEditId(p.id); setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/products/${id}`, { method: "DELETE" });
      if (res.ok) { showMsg("Product deleted!"); fetchProducts(); }
    } catch { showMsg("Error deleting product"); }
    setDeleteConfirm(null); setLoading(false);
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const inputStyle = { width: "100%", padding: "10px 14px", background: "#1a1a1a", border: "1px solid #333",
    borderRadius: 8, color: "#f5f5f5", fontSize: 13, outline: "none", boxSizing: "border-box" as const };
  const labelStyle = { color: "#999", fontSize: 11, letterSpacing: 2, textTransform: "uppercase" as const, marginBottom: 4, display: "block" };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", paddingTop: 80 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: "serif", fontSize: 40, fontWeight: 900, color: "#f5f5f5", marginBottom: 4 }}>
              Admin Panel
            </h1>
            <p style={{ color: "#666", fontSize: 14 }}>Manage products — Create, Read, Update, Delete</p>
          </div>
          <button onClick={() => { setShowForm(!showForm); setForm(EMPTY); setEditId(null); }}
            style={{ background: "#E8C97E", color: "#0a0a0a", border: "none", borderRadius: 30, padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
            {showForm ? "✕ Cancel" : "+ Add New Product"}
          </button>
        </div>

        {/* Message */}
        {msg && (
          <div style={{ padding: "12px 20px", borderRadius: 10, marginBottom: 20,
            background: msg.includes("deleted") ? "rgba(239,68,68,0.15)" : "rgba(34,197,94,0.15)",
            border: `1px solid ${msg.includes("deleted") ? "#ef4444" : "#22c55e"}`,
            color: msg.includes("deleted") ? "#ef4444" : "#22c55e", fontSize: 14, fontWeight: 600 }}>
            {msg.includes("deleted") ? "🗑 " : "✓ "}{msg}
          </div>
        )}

        {/* FORM — CREATE / UPDATE */}
        {showForm && (
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: 16, padding: 28, marginBottom: 32 }}>
            <h2 style={{ color: "#E8C97E", fontFamily: "serif", fontSize: 22, marginBottom: 24 }}>
              {editId ? "✏️ Edit Product #" + editId : "➕ Add New Product"}
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {/* Name */}
              <div>
                <label style={labelStyle}>Product Name *</label>
                <input style={inputStyle} placeholder="e.g. Air Phantom X" value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>

              {/* Brand */}
              <div>
                <label style={labelStyle}>Brand *</label>
                <input style={inputStyle} placeholder="e.g. Nike" value={form.brand}
                  onChange={e => setForm({ ...form, brand: e.target.value })} />
              </div>

              {/* Category */}
              <div>
                <label style={labelStyle}>Category *</label>
                <select style={inputStyle} value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kids">Kids</option>
                </select>
              </div>

              {/* Badge */}
              <div>
                <label style={labelStyle}>Badge</label>
                <select style={inputStyle} value={form.badge || ""}
                  onChange={e => setForm({ ...form, badge: e.target.value || null })}>
                  <option value="">None</option>
                  <option value="New">New</option>
                  <option value="Sale">Sale</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label style={labelStyle}>Price ($) *</label>
                <input style={inputStyle} type="number" placeholder="e.g. 189.99" value={form.price}
                  onChange={e => setForm({ ...form, price: Number(e.target.value) })} />
              </div>

              {/* Old Price */}
              <div>
                <label style={labelStyle}>Old Price ($) — for Sale</label>
                <input style={inputStyle} type="number" placeholder="e.g. 229.99 (optional)" value={form.old_price || ""}
                  onChange={e => setForm({ ...form, old_price: e.target.value ? Number(e.target.value) : null })} />
              </div>

              {/* Rating */}
              <div>
                <label style={labelStyle}>Rating (1-5)</label>
                <input style={inputStyle} type="number" step="0.1" min="1" max="5" value={form.rating}
                  onChange={e => setForm({ ...form, rating: Number(e.target.value) })} />
              </div>

              {/* Reviews */}
              <div>
                <label style={labelStyle}>Number of Reviews</label>
                <input style={inputStyle} type="number" value={form.reviews}
                  onChange={e => setForm({ ...form, reviews: Number(e.target.value) })} />
              </div>

              {/* Image URL */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Image URL</label>
                <input style={inputStyle} placeholder="https://images.unsplash.com/..." value={form.image_url}
                  onChange={e => setForm({ ...form, image_url: e.target.value })} />
              </div>

              {/* Description */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Description</label>
                <textarea style={{ ...inputStyle, height: 80, resize: "vertical" }} placeholder="Product description..."
                  value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              </div>

              {/* In Stock */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <input type="checkbox" checked={form.in_stock} id="instock"
                  onChange={e => setForm({ ...form, in_stock: e.target.checked })}
                  style={{ width: 18, height: 18, cursor: "pointer" }} />
                <label htmlFor="instock" style={{ color: "#999", fontSize: 13, cursor: "pointer" }}>In Stock</label>
              </div>
            </div>

            {/* Preview */}
            {form.image_url && (
              <div style={{ marginTop: 16, padding: 12, background: "#0a0a0a", borderRadius: 8, display: "flex", gap: 12, alignItems: "center" }}>
                <img src={form.image_url} style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8 }} onError={e => { e.currentTarget.style.display = "none"; }} />
                <div>
                  <p style={{ color: "#E8C97E", fontSize: 13, fontWeight: 600 }}>{form.name || "Product Name"}</p>
                  <p style={{ color: "#666", fontSize: 12 }}>{form.brand} — ${form.price}</p>
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <button onClick={handleSubmit} disabled={loading}
                style={{ background: "#E8C97E", color: "#0a0a0a", border: "none", borderRadius: 30, padding: "12px 32px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                {loading ? "Saving..." : editId ? "✓ Update Product" : "✓ Create Product"}
              </button>
              <button onClick={() => { setShowForm(false); setForm(EMPTY); setEditId(null); }}
                style={{ background: "none", color: "#666", border: "1px solid #333", borderRadius: 30, padding: "12px 24px", fontSize: 14, cursor: "pointer" }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* SEARCH + STATS */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
          <input style={{ ...inputStyle, maxWidth: 300 }} placeholder="🔍 Search products..."
            value={search} onChange={e => setSearch(e.target.value)} />
          <div style={{ display: "flex", gap: 8 }}>
            {[["Total", products.length], ["Men", products.filter(p=>p.category==="men").length],
              ["Women", products.filter(p=>p.category==="women").length],
              ["Kids", products.filter(p=>p.category==="kids").length]].map(([label, count]) => (
              <div key={label} style={{ background: "#111", border: "1px solid #222", borderRadius: 10, padding: "6px 14px", textAlign: "center" }}>
                <p style={{ color: "#E8C97E", fontSize: 16, fontWeight: 700 }}>{count}</p>
                <p style={{ color: "#666", fontSize: 10 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PRODUCT TABLE — READ */}
        <div style={{ background: "#111", border: "1px solid #222", borderRadius: 16, overflow: "hidden" }}>
          {/* Table Header */}
          <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 100px 80px 90px 100px 160px",
            padding: "12px 20px", background: "#E8C97E", gap: 12 }}>
            {["Photo", "Product", "Brand", "Cat.", "Price", "Badge", "Actions"].map(h => (
              <div key={h} style={{ fontSize: 11, fontWeight: 700, color: "#0a0a0a", textTransform: "uppercase", letterSpacing: 1 }}>{h}</div>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div style={{ padding: 40, textAlign: "center", color: "#444" }}>
              <p style={{ fontSize: 32, marginBottom: 8 }}>👟</p>
              <p>No products found.</p>
            </div>
          ) : filtered.map((p, i) => (
            <div key={p.id} style={{ display: "grid", gridTemplateColumns: "60px 1fr 100px 80px 90px 100px 160px",
              padding: "14px 20px", gap: 12, borderBottom: "1px solid #1a1a1a",
              background: i % 2 === 0 ? "#111" : "#0d0d0d",
              alignItems: "center" }}>

              {/* Photo */}
              <div style={{ width: 48, height: 48, borderRadius: 8, overflow: "hidden", background: "#1a1a1a" }}>
                {p.image_url
                  ? <img src={p.image_url} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.currentTarget.style.display="none"; }} />
                  : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: 20 }}>👟</div>
                }
              </div>

              {/* Name */}
              <div>
                <p style={{ color: "#f5f5f5", fontSize: 14, fontFamily: "serif", marginBottom: 2 }}>{p.name}</p>
                <p style={{ color: "#555", fontSize: 11 }}>{p.description?.slice(0, 40)}...</p>
              </div>

              {/* Brand */}
              <p style={{ color: "#999", fontSize: 13 }}>{p.brand}</p>

              {/* Category */}
              <span style={{ background: "#1a1a1a", color: "#E8C97E", fontSize: 10, fontWeight: 700,
                padding: "3px 8px", borderRadius: 20, textTransform: "uppercase", letterSpacing: 1 }}>
                {p.category}
              </span>

              {/* Price */}
              <div>
                <p style={{ color: "#f5f5f5", fontSize: 14, fontWeight: 600 }}>${p.price}</p>
                {p.old_price && <p style={{ color: "#555", fontSize: 11, textDecoration: "line-through" }}>${p.old_price}</p>}
              </div>

              {/* Badge */}
              {p.badge
                ? <span style={{ background: p.badge === "Sale" ? "#ef4444" : "#E8C97E",
                    color: p.badge === "Sale" ? "#fff" : "#0a0a0a",
                    fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20 }}>{p.badge}</span>
                : <span style={{ color: "#333", fontSize: 12 }}>—</span>
              }

              {/* Actions */}
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => handleEdit(p)}
                  style={{ background: "rgba(232,201,126,0.15)", color: "#E8C97E", border: "1px solid rgba(232,201,126,0.3)",
                    borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                  ✏️ Edit
                </button>
                <button onClick={() => setDeleteConfirm(p.id)}
                  style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)",
                    borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 200,
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ background: "#111", border: "1px solid #333", borderRadius: 20, padding: 40, maxWidth: 400, width: "90%", textAlign: "center" }}>
              <p style={{ fontSize: 48, marginBottom: 16 }}>⚠️</p>
              <h3 style={{ color: "#f5f5f5", fontFamily: "serif", fontSize: 22, marginBottom: 8 }}>Delete Product?</h3>
              <p style={{ color: "#666", fontSize: 14, marginBottom: 28 }}>
                Are you sure you want to delete product #{deleteConfirm}? This cannot be undone.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                <button onClick={() => handleDelete(deleteConfirm)} disabled={loading}
                  style={{ background: "#ef4444", color: "#fff", border: "none", borderRadius: 30, padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                  {loading ? "Deleting..." : "Yes, Delete"}
                </button>
                <button onClick={() => setDeleteConfirm(null)}
                  style={{ background: "none", color: "#666", border: "1px solid #333", borderRadius: 30, padding: "12px 24px", fontSize: 14, cursor: "pointer" }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <p style={{ color: "#333", fontSize: 12, textAlign: "center", marginTop: 32 }}>
          SoleStride Admin Panel — CRUD Operations via FastAPI REST API
        </p>
      </div>
    </div>
  );
}