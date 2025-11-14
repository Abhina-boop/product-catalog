import React, { useState } from "react";

export default function ProductForm({ addProduct }) {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    quantity: ""
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!product.name || !product.description || !product.price || !product.quantity) return;

    addProduct({
      ...product,
      id: product.id ? product.id : Date.now()
    });

    // Reset form
    setProduct({ id: "", name: "", description: "", price: "", quantity: "" });
  };

  return (
    <div className="card">
      <h2>Add Product</h2>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          name="id"
          placeholder="ID (optional)"
          value={product.id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={product.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          step="0.01"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={product.quantity}
          onChange={handleChange}
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
