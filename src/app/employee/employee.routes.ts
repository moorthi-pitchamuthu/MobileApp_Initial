import { Routes } from '@angular/router';

export const employeeRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/employee-home.component').then(m => m.EmployeeHomeComponent) },
  { path: 'menu', loadComponent: () => import('./menu/employee-menu.component').then(m => m.EmployeeMenuComponent) },
  { path: 'profile', loadComponent: () => import('./profile/employee-profile.component').then(m => m.EmployeeProfileComponent) },
];
