import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="products-container">
      <h1>Products</h1>
      
      <nav class="products-nav">
        <a routerLink="list" routerLinkActive="active">All Products</a>
        <a routerLink="categories" routerLinkActive="active">Categories</a>
        <a routerLink="featured" routerLinkActive="active">Featured</a>
      </nav>
      
      <div class="products-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: `
    .products-container {
      padding: 1rem;
    }
    
    .products-nav {
      margin: 1rem 0;
      padding: 0.5rem 0;
      border-bottom: 1px solid #ddd;
      display: flex;
      gap: 1rem;
    }
    
    .products-nav a {
      padding: 0.5rem 1rem;
      text-decoration: none;
      color: #333;
    }
    
    .products-nav a.active {
      background: #1976d2;
      color: white;
      border-radius: 4px;
    }
    
    .products-content {
      padding: 1rem 0;
    }
  `
})
export class ProductsComponent {}