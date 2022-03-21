import { HomeModule } from './modules/home/home.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';

@NgModule({
  declarations: [CoreComponent],
  imports: [CommonModule, HomeModule, CoreRoutingModule],
})
export class CoreModule {}
