import { IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class CreateProductDto {
   @IsString()
   @MaxLength(50)
   @IsNotEmpty()  
   name!: string;

   @IsString()
   @IsNotEmpty() 
   sku!: string;

   @IsNumber()
   @Min(0)  
   qty!: number;
}