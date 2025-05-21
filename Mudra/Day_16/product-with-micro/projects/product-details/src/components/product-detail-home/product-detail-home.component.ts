import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Product } from '../../../../shared-lib/src/lib/product.model';
import { ProductService } from '../../../../shared-lib/src/lib/product.service';

@Component({
  selector: 'app-product-detail-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail-home.component.html',
  styleUrl: './product-detail-home.component.scss',
})
export class ProductDetailHomeComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  productService: ProductService = inject(ProductService);

  product$!: Observable<Product | null>;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.product$ = this.productService.getProductDetails(id);

    console.log(this.product$);
  }
}
