import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthMethodPageRoutingModule } from './auth-method-routing.module';

import { AuthMethodPage } from './auth-method.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthMethodPageRoutingModule,
  ],
  declarations: [AuthMethodPage],
})
export class AuthMethodPageModule {}
