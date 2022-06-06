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
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CourseDetailsComponent } from '../courses/course-details/course-details.component';
import { AddCourseContentComponent } from '../courses/teacher/add-course-content/add-course-content.component';
import { AboutUsPageComponent } from './about-us-page/about-us-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent, canActivate: [LoginGuard] },
  { path: 'signup', component: SignupPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'about-us', component: AboutUsPageComponent },
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
  {
    path: 'course/details/:course_id',
    component: CourseDetailsComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [UserRole.LEARNER],
    },
  },
  {
    path: 'course/edit/:course_id',
    component: AddCourseContentComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [UserRole.TEACHER],
    },
  },
  {
    path: 'user/profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [UserRole.LEARNER, UserRole.TEACHER],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
