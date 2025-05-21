import { Component, inject, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Product } from '../../../../shared-lib/src/lib/product.model';
import { Observable } from 'rxjs';

import { RouterLink } from '@angular/router';
import { ProductService } from '../../../../shared-lib/src/lib/product.service';

@Component({
  selector: 'app-product-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-home.component.html',
  styleUrl: './product-home.component.scss',
})
export class ProductHomeComponent implements OnInit {
  products$!: Observable<Product[]>;
  productService: ProductService = inject(ProductService);

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }
}
