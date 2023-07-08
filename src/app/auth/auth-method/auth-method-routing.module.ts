import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthMethodPage } from './auth-method.page';

const routes: Routes = [
  {
    path: '',
    component: AuthMethodPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthMethodPageRoutingModule {}
