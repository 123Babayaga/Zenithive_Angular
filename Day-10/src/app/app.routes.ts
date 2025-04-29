import { Routes } from '@angular/router';
import { ImageListComponent } from './components/image-list/image-list.component';
import { VirtualScrollListComponent } from './components/virtual-scroll-list/virtual-scroll-list.component';
import { ImageDetailComponent } from './components/image-detail/image-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/images', pathMatch: 'full' },
  { path: 'images', component: ImageListComponent },
  { path: 'virtual-scroll', component: VirtualScrollListComponent },
  { path: 'images/:id', component: ImageDetailComponent },
  
  { 
    path: 'admin', 
    loadComponent: () => import('./admin/admin-dashboard/admin-dashboard.component')
      .then(c => c.AdminDashboardComponent)
  }
];