import { ProductFormValues } from "../interfaces/product-form-values.interface";

export class CreateProductDto {
    name: string;
    sku: string;
    qty: number;

    constructor(dto: CreateProductDto) {
        Object.assign(this, dto);
    }

    static createPayload(value: ProductFormValues): CreateProductDto {
        return new CreateProductDto({
            name: value.name,
            sku: value.sku,
            qty: +value.qty
        })
    }
}