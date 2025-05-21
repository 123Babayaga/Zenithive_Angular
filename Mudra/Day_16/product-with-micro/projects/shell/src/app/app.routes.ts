import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'product',
    loadChildren: () =>
      loadRemoteModule('product', './Routes').then((m) => m.routes),
  },
  {
    path: 'product_details/:id',
    loadChildren: () =>
      loadRemoteModule('product-details', './Routes').then((m) => m.routes),
  },
];
