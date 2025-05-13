/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Product } from './product.schema';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class CartItem {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })
  productId: Product;

  @Prop({ required: true, default: 1 })
  quantity: number;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);

@Schema({ timestamps: true })
export class Cart {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: [CartItemSchema], default: [] })
  items: CartItem[];

  @Prop({ default: 0 })
  totalPrice: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);