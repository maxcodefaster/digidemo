import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodeInputModule } from 'angular-code-input';
import { PhoneOtpPageRoutingModule } from './phone-otp-routing.module';

import { PhoneOtpPage } from './phone-otp.page';
import { ProgressSpinnerComponent } from '../../shared/components/progress-spinner/progress-spinner.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhoneOtpPageRoutingModule,
    CodeInputModule,
    ProgressSpinnerComponent,
  ],
  declarations: [PhoneOtpPage],
})
export class PhoneOtpPageModule {}
