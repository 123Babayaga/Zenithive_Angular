/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsOptional()
  rating?: {
    rate: number;
    count: number;
  };
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  rating?: {
    rate: number;
    count: number;
  };
}