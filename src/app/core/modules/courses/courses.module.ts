import { HomeModule } from './../home/home.module';
import { BuilderModule } from '@builder.io/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCourseComponent } from './teacher/create-course/create-course.component';
import { ListCoursesComponent } from './learner/list-courses/list-courses.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateCourseComponent, ListCoursesComponent],
  imports: [
    CommonModule,
    EditorModule,
    BuilderModule.forRoot('94fed378fffe41ba8361922c459a48cd'),
    HomeModule,
    FormsModule,
  ],
})
export class CoursesModule {}
