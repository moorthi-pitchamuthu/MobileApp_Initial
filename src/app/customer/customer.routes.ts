import { Routes } from '@angular/router';

export const customerRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () => import('./dashboard/customer-dashboard.component').then(m => m.CustomerDashboardComponent) },
  { path: 'menu', loadComponent: () => import('./menu/customer-menu.component').then(m => m.CustomerMenuComponent) },
  { path: 'profile', loadComponent: () => import('./profile/customer-profile.component').then(m => m.CustomerProfileComponent) },
];
