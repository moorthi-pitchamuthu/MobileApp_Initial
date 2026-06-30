import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { customerGuard } from './core/guards/customer.guard';
import { employeeGuard } from './core/guards/employee.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  // ── Auth (public) ──────────────────────────────────────────────
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes),
  },

  // ── Admin ──────────────────────────────────────────────────────
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    loadChildren: () => import('./admin/admin.routes').then(m => m.adminRoutes),
  },

  // ── Customer ───────────────────────────────────────────────────
  {
    path: 'customer',
    canActivate: [authGuard, customerGuard],
    loadChildren: () => import('./customer/customer.routes').then(m => m.customerRoutes),
  },

  // ── Employee ───────────────────────────────────────────────────
  {
    path: 'employee',
    canActivate: [authGuard, employeeGuard],
    loadChildren: () => import('./employee/employee.routes').then(m => m.employeeRoutes),
  },

  { path: '**', redirectTo: 'auth/login' },
];
