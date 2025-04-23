import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/user/components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./features/admin/admin.component').then(m => m.AdminComponent),
    loadChildren: () => import('./features/admin/admin.routes').then(r => r.ADMIN_ROUTES),
    data: { preload: true } // Preload admin module
  },
  {
    path: 'products',
    loadComponent: () => import('./features/products/products.component').then(m => m.ProductsComponent),
    loadChildren: () => import('./features/products/products.routes').then(r => r.PRODUCTS_ROUTES)
  },
  {
    path: 'user',
    loadComponent: () => import('./features/user/user.component').then(m => m.UserComponent),
    loadChildren: () => import('./features/user/user.routes').then(r => r.USER_ROUTES)
  },
  {
    path: '**',
    redirectTo: ''
  }
];