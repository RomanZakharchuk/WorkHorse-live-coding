import axios from 'axios';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getProducts = () => apiClient.get('/products');
export const addProduct = (product: CreateProductDto) => apiClient.post('/products', product);
export const updateProduct = (product: UpdateProductDto) => apiClient.put(`/products/updateProduct`, product);
export const deleteProduct = (productId: string) => apiClient.delete(`/products/${productId}`);