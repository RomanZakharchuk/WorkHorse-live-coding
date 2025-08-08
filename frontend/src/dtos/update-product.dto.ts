import { ProductFormValues } from "../interfaces/product-form-values.interface";

export class UpdateProductDto {
    _id: string;
    qty: number;

    constructor(dto: UpdateProductDto) {
        Object.assign(this, dto);
    }

    static createPayload(productId: string, value: ProductFormValues): UpdateProductDto {
        return new UpdateProductDto({
            _id: productId,
            qty: +value.qty
        })
    }
}