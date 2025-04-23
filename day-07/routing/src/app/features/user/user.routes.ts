import { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    loadComponent: () => import('./components/user-profile/user-profile.component')
      .then(c => c.UserProfileComponent)
  },
  {
    path: 'orders',
    loadComponent: () => import('./components/user-orders/user-orders.component')
      .then(c => c.UserOrdersComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('./components/user-settings/user-settings.component')
      .then(c => c.UserSettingsComponent)
  }
];