import React from "react";
import ProductList from "./components/ProductList";
import AdminForm from "./components/AdminForm";

function App() {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "20px auto",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1>Product Store</h1>
      <AdminForm />
      <ProductList />
    </div>
  );
}

export default App;
