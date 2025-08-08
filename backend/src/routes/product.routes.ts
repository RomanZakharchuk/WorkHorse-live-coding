import { Router } from "express";
import { Route } from "../decorators/route.decorator";
import { Routes } from "../interfaces/route.interface";
import { ProductsController } from "../controllers/products.controllers";
import validationMiddleware from "../middlewares/validation.middleware";
import { CreateProductDto } from "../dtos/create-product.dto";
import { UpdateProductDto } from "../dtos/update-product.dto";

@Route()
export class ProductsRoute implements Routes {
   path = '/products';
   router = Router();

   constructor(public productsController: ProductsController) {
      this.initializeRoutes();
   }

   private initializeRoutes() {
      this.router.get(`${this.path}`,
         this.productsController.getProducts
      );

      this.router.post(`${this.path}`,
         validationMiddleware(CreateProductDto, 'body'),
         this.productsController.createProduct
      );

      this.router.put(`${this.path}/updateProduct`,
         validationMiddleware(UpdateProductDto, 'body'),
         this.productsController.updateProductById
      );

      this.router.delete(`${this.path}/:productId`,
         this.productsController.deleteProductById
      );
   }
}