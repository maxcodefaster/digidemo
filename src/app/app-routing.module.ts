import { NgModule } from '@angular/core';
import { PreloadAllModules, Route, RouterModule, Routes } from '@angular/router';
import { loggedInGuard } from './shared/guards/loggedIn.guard';
import { loggedOutGuard } from './shared/guards/loggedOut.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [loggedInGuard],
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule),
    canActivate: [loggedInGuard],
  },
  {
    path: 'enter-digi-demo',
    loadChildren: () => import('./auth/enter-digi-demo/enter-digi-demo.module').then((m) => m.EnterDigiDemoPageModule),
    canActivate: [loggedOutGuard],
  },
  {
    path: 'auth-method',
    loadChildren: () => import('./auth/auth-method/auth-method.module').then(m => m.AuthMethodPageModule),
    canActivate: [loggedOutGuard],
  },
  {
    path: 'auth-email',
    loadChildren: () => import('./auth/auth-email/auth-email.module').then(m => m.AuthEmailPageModule),
    canActivate: [loggedOutGuard],
  },
  {
    path: 'set-email',
    loadChildren: () => import('./auth/set-email/set-email.module').then(m => m.SetEmailPageModule),
    canActivate: [loggedOutGuard],
  },
  {
    path: 'set-password',
    loadChildren: () => import('./auth/set-password/set-password.module').then(m => m.SetPasswordPageModule),
    canActivate: [loggedOutGuard],
  },
  {
    path: 'auth-phone',
    loadChildren: () => import('./auth/auth-phone/auth-phone.module').then(m => m.AuthPhonePageModule),
    canActivate: [loggedOutGuard],
  },
  {
    path: 'phone-otp',
    loadChildren: () => import('./auth/phone-otp/phone-otp.module').then(m => m.PhoneOtpPageModule),
    canActivate: [loggedOutGuard],
  },
];

const notFoundRoute: Route = { path: '**', redirectTo: '' };

@NgModule({
  imports: [
    RouterModule.forRoot([...routes, notFoundRoute], { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
