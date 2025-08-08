import { modelOptions, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";

@modelOptions({
    schemaOptions: {
       timestamps: true,
       collection: 'products'
    }
 })
export class Product {
    _id!: mongoose.Types.ObjectId;;

    @prop({type: String, required: true})
    name!: string;

    @prop({type: String, unique: true})
    sku!: string;

    @prop({type: Number, required: true})
    qty!: number;

    @prop({type: Date})
    created_at!:  Date;

    @prop({type: Date})
    updated_at!: Date;

    @prop()
    __v?: number;
}