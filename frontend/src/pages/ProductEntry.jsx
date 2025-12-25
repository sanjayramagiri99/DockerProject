import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "";

function ProductEntry() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/products`);
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price.trim()) {
      setError("Name and price are required");
      return;
    }
    const price = parseFloat(formData.price);
    if (isNaN(price) || price < 0) {
      setError("Price must be a valid positive number");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          price: price,
          description: formData.description,
        }),
      });
      if (!res.ok) throw new Error(`Save failed: ${res.status}`);
      setFormData({ name: "", price: "", description: "" });
      await loadProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <section className="card">
        <h2>Product Entry</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              type="text"
              id="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={saving}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price *</label>
            <input
              type="number"
              id="price"
              step="0.01"
              min="0"
              placeholder="Enter price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              disabled={saving}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={saving}
              rows="4"
            />
          </div>
          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Add Product"}
          </button>
        </form>
        {error && <p className="error">Error: {error}</p>}
      </section>

      <section className="card">
        <h2>Products</h2>
        {loading ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <ul className="list">
            {products.map((product) => (
              <li key={product.id}>
                <div className="list-item">
                  <strong>{product.name}</strong>
                  <div>${product.price.toFixed(2)}</div>
                  {product.description && <div>{product.description}</div>}
                  <small>{new Date(product.createdAt).toLocaleString()}</small>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default ProductEntry;

