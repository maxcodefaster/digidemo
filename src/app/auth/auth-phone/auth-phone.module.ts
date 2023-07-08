import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPhonePageRoutingModule } from './auth-phone-routing.module';

import { AuthPhonePage } from './auth-phone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AuthPhonePageRoutingModule,
  ],
  declarations: [AuthPhonePage],
})
export class AuthPhonePageModule {}
