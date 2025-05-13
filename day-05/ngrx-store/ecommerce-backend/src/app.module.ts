/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './modules/products.module';
import { CartsModule } from './modules/cart.module';

@Module({
  imports: [
    // Load environment variables from .env file
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // MongoDB connection using Mongoose
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI') || 'mongodb://localhost:27017/ecommerce',
      }),
    }),

    // Your application feature modules
    ProductsModule,
    CartsModule,
  ],
})
export class AppModule {}
