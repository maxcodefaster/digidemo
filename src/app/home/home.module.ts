import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PokemonSpritePipe } from '../shared/pipes/pokemon-sprite.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ScrollingModule,
    PokemonSpritePipe,
    NgOptimizedImage,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
