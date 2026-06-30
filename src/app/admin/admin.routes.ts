import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/admin-home.component').then(m => m.AdminHomeComponent) },
  { path: 'menu', loadComponent: () => import('./menu/admin-menu.component').then(m => m.AdminMenuComponent) },
  { path: 'app-management', loadComponent: () => import('./app-management/app-management.component').then(m => m.AppManagementComponent) },
  { path: 'profile', loadComponent: () => import('./profile/admin-profile.component').then(m => m.AdminProfileComponent) },
];
