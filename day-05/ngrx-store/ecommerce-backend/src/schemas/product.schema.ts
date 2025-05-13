/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Rating {
  @Prop({ required: true, default: 0 })
  rate: number;

  @Prop({ required: true, default: 0 })
  count: number;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  image: string;

  @Prop({ type: RatingSchema, default: { rate: 0, count: 0 } })
  rating: Rating;

  @Prop({ default: 1 })
  quantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);