import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetEmailPage } from './set-email.page';

const routes: Routes = [
  {
    path: '',
    component: SetEmailPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetEmailPageRoutingModule {}
