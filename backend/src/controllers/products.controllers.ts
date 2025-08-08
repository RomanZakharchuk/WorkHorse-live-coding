import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

@Service()
export class ProductsController {
   constructor(private productsService: ProductsService) { }

   getProducts = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const products = await this.productsService.getProducts();

         res.status(200).json(products);
      } catch (error) {
         next(error);
      }
   }

   createProduct = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const dto: CreateProductDto = req.body;

         const createdProduct = await this.productsService.createdProduct(dto);

         res.status(200).json(createdProduct);
      } catch (error) {
         next(error);
      }
   }

   updateProductById = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const dto: UpdateProductDto = req.body;

         const updatedProduct = await this.productsService.updateProductById(dto);

         res.status(200).json(updatedProduct);
      } catch (error) {
         next(error);
      }
   }

   deleteProductById = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const productId: string = req.params.productId;

         await this.productsService.deleteProductById(productId);

         res.status(200).json({message: 'deleted'});
      } catch (error) {
         next(error);
      }
   };
}
