import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { LoginAuthGuard } from './core/guard/login-auth.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [LoginAuthGuard],
    loadComponent: () => import('./pages/login/login.page').then(c => c.LoginPage)
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./pages/sign-in/sign-in.page').then(c => c.SignInPage)
  },
  {
    path: 'memo',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/memo/memo.page').then(c => c.MemoPage)
  },
  {
    path: 'memo-detail',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/memo-detail/memo-detail.page').then(c => c.MemoDetailPage)
  },
  {
    path: 'memo-detail/:id',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/memo-detail/memo-detail.page').then(c => c.MemoDetailPage)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
