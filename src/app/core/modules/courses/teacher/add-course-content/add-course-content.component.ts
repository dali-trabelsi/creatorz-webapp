import { CourseSection } from './../../_models/courseSection.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { CourseModel } from '../../_models/course.model';
import { CourseChapter } from '../../_models/courseChapter.model';

@Component({
  selector: 'add-course-content',
  templateUrl: './add-course-content.component.html',
  styleUrls: ['./add-course-content.component.scss'],
})
export class AddCourseContentComponent implements OnInit {
  course_id: string;
  faPlus = faPlus;
  faSave = faSave;

  course!: CourseModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.course_id = route.snapshot.paramMap.get('course_id') || '';
    console.log(this.course_id);
  }

  ngOnInit(): void {
    this.http
      .get<CourseModel>(environment.apiUrl + '/course/' + this.course_id)
      .subscribe((course: CourseModel) => {
        this.course = course;
        if (!course) {
          this.router.navigate(['404']);
        }
      });
  }

  addChapterComponent(s: CourseSection) {
    s.chapters.push({ _id: '', title: '', lessons: [] });
  }

  addLessonComponent(c: CourseChapter) {
    c.lessons.push({ _id: '', title: '', elements: [] });
  }

  uploadedFile(event: any) {
    console.log(event);
  }
}
