import { Product } from "./product.interface";

export interface ProductListProps {
    refreshKey: number;
    setEditingProduct: (value?: Product) => void;
    onProductSaved: () => void;
}
