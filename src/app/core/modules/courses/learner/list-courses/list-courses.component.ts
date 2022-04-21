import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CourseModel } from './../../../../models/course.model';
import { CoursesService } from 'src/app/core/services/courses/course.service';
import { Component, OnInit, Inject } from '@angular/core';
import jwtDecode from 'jwt-decode';

const token = jwtDecode(localStorage.getItem('accessToken') || '') as {
  role: string;
};
@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.scss'],
})
export class ListCoursesComponent implements OnInit {
  courses: CourseModel[] = [];
  userRole = token.role;

  constructor(
    private courseService: CoursesService,
    @Inject(Router) router: Router
  ) {}

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe((res) => {
      res.forEach((course: CourseModel) => {
        course.thumbnail = environment.apiUrl + '/media/' + course.thumbnail;
      });
      this.courses = res;
    });
  }
}
