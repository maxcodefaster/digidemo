import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnterDigiDemoPage } from './enter-digi-demo.page';

const routes: Routes = [
  {
    path: '',
    component: EnterDigiDemoPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterDigiDemoPageRoutingModule {}
