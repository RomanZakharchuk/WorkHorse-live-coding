import { useEffect, useState } from "react";
import { Product } from "../interfaces/product.interface";
import { deleteProduct, getProducts } from "../api/api";
import { ProductListProps } from "../interfaces/product-list-props.interface";

export const ProductList = ({
  refreshKey,
  setEditingProduct,
  onProductSaved,
}: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>("");

  const fetchProducts = async () => {
    try {
      const response = await getProducts();

      setProducts(response.data);
    } catch (err) {
      setError("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshKey]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id)
        .then(() => {
          onProductSaved();
        })
        .catch(() => {
          alert("Something went wrong");
        });
    }
  };

  return (
    <>
      <h3 className="mb-4">Product lists</h3>

      {error && <p className="text-danger">{error}</p>}

      {products.length ? (
        products.map((product: Product) => (
          <div
            key={product._id}
            className="d-flex justify-content-between align-items-center border rounded p-3 mb-3 shadow-sm"
          >
            <div>
              <div className="fw-bold fs-5">{product.name}</div>
              <div className="text-muted">SKU: {product.sku}</div>
              <div>Quantity: {product.qty}</div>
            </div>

            <div>
              <button
                className="btn btn-sm btn-outline-primary me-2"
                onClick={() => setEditingProduct(product)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted fst-italic">
          The products are not available yet
        </p>
      )}
    </>
  );
};
