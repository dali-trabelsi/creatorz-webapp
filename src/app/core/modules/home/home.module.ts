import { LoginGuard } from './../../guards/login-guard';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HomeComponent,
    HomePageComponent,
    NavBarComponent,
    FooterComponent,
    LoginPageComponent,
    SignupPageComponent,
    ContactPageComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [NavBarComponent, FooterComponent],
  providers: [LoginGuard],
})
export class HomeModule {}
