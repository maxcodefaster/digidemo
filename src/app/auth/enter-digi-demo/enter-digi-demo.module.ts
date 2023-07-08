import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EnterDigiDemoPageRoutingModule } from './enter-digi-demo-routing.module';
import { EnterDigiDemoPage } from './enter-digi-demo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnterDigiDemoPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [EnterDigiDemoPage],
})
export class EnterDigiDemoPageModule {}
