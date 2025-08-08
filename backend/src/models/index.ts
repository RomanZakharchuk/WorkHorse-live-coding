import { getModelForClass } from "@typegoose/typegoose";
import { Product } from "./product.model";

export const productModel = getModelForClass(Product);