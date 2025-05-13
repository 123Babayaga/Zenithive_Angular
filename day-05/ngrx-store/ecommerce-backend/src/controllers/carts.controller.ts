/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartsService } from '../services/carts.service';
import { AddToCartDto, RemoveFromCartDto, UpdateCartItemDto } from '../dto/cart.dto';
import { Cart } from '../schemas/cart.schema';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get(':userId')
  findCart(@Param('userId') userId: string): Promise<Cart> {
    return this.cartsService.findCart(userId);
  }

  @Post('add')
  addToCart(@Body() addToCartDto: AddToCartDto): Promise<Cart> {
    return this.cartsService.addToCart(addToCartDto);
  }

  @Patch('update')
  updateCartItem(@Body() updateCartItemDto: UpdateCartItemDto): Promise<Cart> {
    return this.cartsService.updateCartItem(updateCartItemDto);
  }

  @Delete('remove')
  removeFromCart(@Body() removeFromCartDto: RemoveFromCartDto): Promise<Cart> {
    return this.cartsService.removeFromCart(removeFromCartDto);
  }

  @Delete(':userId')
  clearCart(@Param('userId') userId: string): Promise<Cart> {
    return this.cartsService.clearCart(userId);
  }
}