import React, { useState } from "react";

export default function ProductList({ products, updateQuantity, deleteProduct }) {
  const [editableId, setEditableId] = useState(null);
  const [editQuantity, setEditQuantity] = useState("");

  const startEditing = (id, quantity) => {
    setEditableId(id);
    setEditQuantity(quantity);
  };

  const finishEditing = (id) => {
    updateQuantity(id, editQuantity);
    setEditableId(null);
    setEditQuantity("");
  };

  return (
    <div className="card">
      <h2>Products</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Description</th><th>Price</th><th>Quantity</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr><td colSpan="6" style={{ textAlign: "center" }}>No products added.</td></tr>
          )}
          {products.map(({ id, name, description, price, quantity }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{description}</td>
              <td>${parseFloat(price).toFixed(2)}</td>
              <td>
                {editableId === id ? (
                  <input
                    className="quantity-input"
                    type="number"
                    value={editQuantity}
                    onChange={(e) => setEditQuantity(e.target.value)}
                    onBlur={() => finishEditing(id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") finishEditing(id);
                    }}
                    autoFocus
                  />
                ) : (
                  <span onClick={() => startEditing(id, quantity)} style={{ cursor: "pointer" }}>
                    {quantity}
                  </span>
                )}
              </td>
              <td>
                <button className="delete" onClick={() => deleteProduct(id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
