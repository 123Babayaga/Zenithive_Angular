/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from '../schemas/cart.schema';
import { Product, ProductDocument } from '../schemas/product.schema';
import { AddToCartDto, RemoveFromCartDto, UpdateCartItemDto } from '../dto/cart.dto';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async findCart(userId: string): Promise<Cart> {
    let cart = await this.cartModel
      .findOne({ userId })
      .populate('items.productId')
      .exec();

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = await this.cartModel.create({ userId, items: [], totalPrice: 0 });
    }

    return cart;
  }

  async addToCart(addToCartDto: AddToCartDto): Promise<Cart> {
    const { userId, productId, quantity = 1 } = addToCartDto;

    // Validate product exists
    const product = await this.productModel.findById(productId).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID "${productId}" not found`);
    }

    // Find or create cart
    let cart = await this.cartModel.findOne({ userId }).exec();
    if (!cart) {
      cart = await this.cartModel.create({ userId, items: [], totalPrice: 0 });
    }

    // Check if product already in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId,
    );

    if (itemIndex > -1) {
      // Product exists, update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Product doesn't exist in cart, add new item
      cart.items.push({ productId, quantity });
    }

    // Recalculate total price
    await this.recalculateCartTotal(cart);

    return cart.save();
  }

  async updateCartItem(updateCartItemDto: UpdateCartItemDto): Promise<Cart> {
    const { userId, productId, quantity } = updateCartItemDto;

    const cart = await this.cartModel.findOne({ userId }).exec();
    if (!cart) {
      throw new NotFoundException(`Cart for user "${userId}" not found`);
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId,
    );

    if (itemIndex === -1) {
      throw new NotFoundException(
        `Product with ID "${productId}" not found in cart`,
      );
    }

    cart.items[itemIndex].quantity = quantity;

    // Recalculate total price
    await this.recalculateCartTotal(cart);

    return cart.save();
  }

  async removeFromCart(removeFromCartDto: RemoveFromCartDto): Promise<Cart> {
    const { userId, productId } = removeFromCartDto;

    const cart = await this.cartModel.findOne({ userId }).exec();
    if (!cart) {
      throw new NotFoundException(`Cart for user "${userId}" not found`);
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId,
    );

    // Recalculate total price
    await this.recalculateCartTotal(cart);

    return cart.save();
  }

  async clearCart(userId: string): Promise<Cart> {
    const cart = await this.cartModel.findOne({ userId }).exec();
    if (!cart) {
      throw new NotFoundException(`Cart for user "${userId}" not found`);
    }

    cart.items = [];
    cart.totalPrice = 0;

    return cart.save();
  }

  // Helper method to recalculate cart total
  private async recalculateCartTotal(cart: CartDocument): Promise<void> {
    const populatedCart = await cart.populate('items.productId');
    let totalPrice = 0;
    for (const item of populatedCart.items) {
      const product = item.productId as unknown as Product;
      totalPrice += product.price * item.quantity;
    }
    cart.totalPrice = parseFloat(totalPrice.toFixed(2)); // Fix floating point precision
  }
}