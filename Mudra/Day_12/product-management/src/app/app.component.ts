import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { GET_PRODUCTS } from '../services/query';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'product-management';
  product: any[] = [];
  apollo: Apollo = inject(Apollo);

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.apollo.watchQuery({ query: GET_PRODUCTS }).valueChanges.subscribe({
      next: (result: any) => {
        console.log('Products:', result.data.products);
        this.product = result.data.products;
        const cache = this.apollo.client.cache;
        const data = cache.extract();
        console.log(data);
      },
      error: (error) => {
        console.error('GraphQL Error:', error);
      },
    });
  }
}
