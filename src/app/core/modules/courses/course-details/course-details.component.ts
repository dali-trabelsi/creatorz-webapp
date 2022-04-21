import { environment } from './../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseModel } from 'src/app/core/models/course.model';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
  course_id: string;
  course!: CourseModel;
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.course_id = route.snapshot.paramMap.get('course_id') || '';
    console.log(this.course_id);
  }
  ngOnInit(): void {
    this.http
      .get<CourseModel>(environment.apiUrl + '/course/' + this.course_id)
      .subscribe({
        next: (res: CourseModel) => {
          this.course = res;
          this.course.thumbnail =
            environment.apiUrl + '/media/' + this.course.thumbnail;

          this.course.teacher.avatar =
            environment.apiUrl + '/media/' + this.course.teacher.avatar;

          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
