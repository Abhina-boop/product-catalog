// src/App.jsx
import React, { useState, useEffect } from "react";
import ProductForm from "./components/ProductForm";   // your existing form
import ProductList from "./components/ProductList";   // your existing list
import Search from "./components/Search";             // new component below
import "./components/Style.css";

export default function App() {
  const [products, setProducts] = useState([]);

  // Fetch all products from backend
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8000/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (product) => {
    try {
      const res = await fetch("http://localhost:8000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      setProducts((prev) => [...prev, data]);
    } catch (err) {
      console.error("Add product failed:", err);
    }
  };

  const updateQuantity = async (id, quantity) => {
    try {
      const res = await fetch(`http://localhost:8000/products/${id}?quantity=${quantity}`, {
        method: "PUT",
      });
      const updated = await res.json();
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch (err) {
      console.error("Update quantity failed:", err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:8000/products/${id}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Product Catalog</h1>

      <section className="card add-section">
        <ProductForm addProduct={addProduct} />
      </section>

      <section className="card list-section">
        <h2>Products</h2>
        <ProductList
          products={products}
          updateQuantity={updateQuantity}
          deleteProduct={deleteProduct}
        />
      </section>

      <section className="card search-section">
        <Search />
      </section>
    </div>
  );
}
