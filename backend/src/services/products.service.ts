import { ObjectId } from './../../node_modules/bson/src/objectid';
import { Service } from 'typedi';
import { Product } from '../models/product.model';
import { productModel } from '../models';
import { HttpException } from '../exceptions/http-exception';
import mongoose from 'mongoose';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';


@Service()
export class ProductsService {
   constructor() { }

   async getProducts(): Promise<Product[]> {
      const products = await productModel.find()
         .lean<Product[]>();

      if (!products) {
         throw new HttpException(404, 'Products not found');
      }

      return products;
   }

   async createdProduct(dto: CreateProductDto): Promise<Product> {
      return productModel.create(dto);
   }

   async updateProductById(dto: UpdateProductDto): Promise<Product> {
      const product = await productModel.findById(dto._id).lean<Product>();

      if (!product) {
         throw new HttpException(404, 'Product not found');
      }

      const updated = await productModel.findOneAndUpdate(
         { _id: dto._id, __v: product.__v },
         {
            $set: { qty: dto.qty },
            $inc: { __v: 1 }
         },
         { new: true }
      ).lean<Product>();

      if (!updated) {
         throw new HttpException(409, 'Conflict detected, product was updated by another process');
      }

      return updated;
   }

   async deleteProductById(productId: string) {
      const product = await this.productExists(productId);

      if (!product) {
         throw new HttpException(404, 'Product not found');
      }

      await productModel.deleteOne({ _id: productId });
   }

   private async productExists(id: string): Promise<boolean> {
      const product = productModel.exists({
         _id: new mongoose.Types.ObjectId(id)
      });

      return !!product;
   }
}
