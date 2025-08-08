import { Product } from "./product.interface";

export interface ProductFormProps {
    onProductSaved: () => void;
    editingProduct?: Product;
}
