import { HomeModule } from './modules/home/home.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { AuthGuard } from './guards/auth-guard';
import { CoursesModule } from './modules/courses/courses.module';

@NgModule({
  declarations: [CoreComponent],
  imports: [CommonModule, HomeModule, CoreRoutingModule, CoursesModule],
  providers: [AuthGuard],
})
export class CoreModule {}
