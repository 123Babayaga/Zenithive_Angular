/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class AddToCartDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number;
}

export class UpdateCartItemDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;
}

export class RemoveFromCartDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  productId: string;
}