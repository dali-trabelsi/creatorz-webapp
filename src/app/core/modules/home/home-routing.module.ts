import { UserRole } from './../../enums/user-roles';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PlatformComponent } from './../platform/platform.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { ListCoursesComponent } from '../courses/learner/list-courses/list-courses.component';
import { AuthGuard } from '../../guards/auth-guard';
import { CreateCourseComponent } from '../courses/teacher/create-course/create-course.component';
import { LoginGuard } from '../../guards/login-guard';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent, canActivate: [LoginGuard] },
  { path: 'signup', component: SignupPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'app', component: PlatformComponent },
  {
    path: 'courses/list',
    component: ListCoursesComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [UserRole.LEARNER, UserRole.TEACHER],
    },
  },
  {
    path: 'course/create',
    component: CreateCourseComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [UserRole.TEACHER],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
