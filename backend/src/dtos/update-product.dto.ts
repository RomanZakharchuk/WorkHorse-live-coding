import { IsNumber, IsString, Min } from 'class-validator';

export class UpdateProductDto {
   @IsString()
   _id!: string;

   @IsNumber()
   @Min(0)  
   qty!: number;
}