import { addProduct, updateProduct } from "../api/api";
import { useForm } from "react-hook-form";
import { ProductFormValues } from "../interfaces/product-form-values.interface";
import { ProductFormProps } from "../interfaces/product-form-props.interface";
import { CreateProductDto } from "../dtos/create-product.dto";
import { useEffect } from "react";
import { UpdateProductDto } from "../dtos/update-product.dto";

export const ProductForm = ({
  onProductSaved,
  editingProduct,
}: ProductFormProps) => {
  const DEFAULT_VALUES = { name: "", sku: "", qty: 0 };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (editingProduct) {
      reset(editingProduct);
    } else {
      reset(DEFAULT_VALUES);
    }
  }, [editingProduct, reset]);

  const onSubmit = async (data: ProductFormValues) => {
    if (editingProduct) {
      const payload = UpdateProductDto.createPayload(editingProduct._id, data);

      await updateProduct(payload).then(() => {
        reset();
        onProductSaved();
      });
    } else {
      const payload = CreateProductDto.createPayload(data);

      await addProduct(payload).then(() => {
        reset();
        onProductSaved();
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border rounded-3 p-4 shadow-sm bg-white"
    >
      <h3 className="text-center mb-4">
        {editingProduct ? "Edit product" : "Add new product"}
      </h3>

      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          {...register("name", {
            required: "Name is required",
            minLength: { value: 2, message: "At least 2 characters" },
          })}
          disabled={!!editingProduct}
        />
        {errors.name && (
          <div className="invalid-feedback">{errors.name.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="sku" className="form-label">
          Stock Keeping Unit
        </label>
        <input
          className={`form-control ${errors.sku ? "is-invalid" : ""}`}
          {...register("sku", { required: "SKU is required" })}
          disabled={!!editingProduct}
        />
        {errors.sku && (
          <div className="invalid-feedback">{errors.sku.message}</div>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="qty" className="form-label">
          Quantity
        </label>
        <input
          type="number"
          className={`form-control ${errors.qty ? "is-invalid" : ""}`}
          {...register("qty", {
            required: "Quantity is required",
            min: { value: 1, message: "Must be greater than 0" },
          })}
        />
        {errors.qty && (
          <div className="invalid-feedback">{errors.qty.message}</div>
        )}
      </div>

      <button type="submit" className="btn btn-primary w-100">
        {editingProduct ? "Update" : "Add product"}
      </button>
    </form>
  );
};
