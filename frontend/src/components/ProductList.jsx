import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  const handleContact = async (product) => {
    const userEmail = prompt("Enter your email:");
    if (!userEmail) return;
    const message = `Hi, I am interested in ${product.name}`;
    try {
      await axios.post("http://localhost:5000/api/contact", {
        productName: product.name,
        userEmail,
        message,
      });
      alert("Email sent to admin!");
    } catch (err) {
      alert("Failed to send email");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <img
              src={p.image}
              alt={p.name}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <p>{p.description}</p>
            <button onClick={() => handleContact(p)}>Contact Admin</button>
          </div>
        ))}
      </div>
    </div>
  );
}
