import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProductForm } from "./components/ProductForm";
import { ProductList } from "./components/ProductList";
import { Product } from "./interfaces/product.interface";

function App() {
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [editingProduct, setEditingProduct] = useState<Product>();

  const handleProductSaved = () => {
    setEditingProduct(undefined);
    setRefreshKey((oldKey) => oldKey + 1);
  };

  return (
    <>
      <header className="text-center py-5">
        <h1>Inventory management system</h1>
      </header>

      <main className="w-75 m-auto">
        <ProductForm
          onProductSaved={handleProductSaved}
          editingProduct={editingProduct}
        />
        <hr />
        <ProductList
          refreshKey={refreshKey}
          setEditingProduct={setEditingProduct}
          onProductSaved={handleProductSaved}
        />
      </main>
    </>
  );
}

export default App;
