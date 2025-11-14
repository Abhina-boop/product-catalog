// src/components/Search.jsx
import React, { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e && e.preventDefault();
    const q = query.trim();
    if (!q) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/products/search?query=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await fetch(`http://localhost:8000/products/${id}`, { method: "DELETE" });
      setResults((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="search-wrapper">
      <h2 className="section-title">Search Products</h2>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search by name, description, or price"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="btn search-btn">Search</button>
      </form>

      {loading && <div className="muted">Searching...</div>}

      {results.length > 0 && (
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th style={{ textAlign: "left" }}>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td style={{ textAlign: "left" }}>{p.description}</td>
                <td>${Number(p.price).toFixed(2)}</td>
                <td>{p.quantity}</td>
                <td>
                  <button className="btn delete-btn" onClick={() => handleDelete(p.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && results.length === 0 && query.trim() !== "" && (
        <div className="muted">No results found for "{query}"</div>
      )}
    </div>
  );
}
