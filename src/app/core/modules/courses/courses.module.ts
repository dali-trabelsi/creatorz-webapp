import { HomeModule } from './../home/home.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCourseComponent } from './teacher/create-course/create-course.component';
import { ListCoursesComponent } from './learner/list-courses/list-courses.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { FileUploadComponent } from './teacher/file-upload/file-upload.component';
import { AddCourseContentComponent } from './teacher/add-course-content/add-course-content.component';

@NgModule({
  declarations: [
    CreateCourseComponent,
    ListCoursesComponent,
    CourseDetailsComponent,
    FileUploadComponent,
    AddCourseContentComponent,
  ],
  imports: [
    CommonModule,
    EditorModule,
    HomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
  ],
})
export class CoursesModule {}
