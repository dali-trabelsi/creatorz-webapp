import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'add-course-content',
  templateUrl: './add-course-content.component.html',
  styleUrls: ['./add-course-content.component.scss'],
})
export class AddCourseContentComponent implements OnInit {
  course_id: string;

  constructor(private route: ActivatedRoute) {
    this.course_id = route.snapshot.paramMap.get('course_id') || '';
    console.log(this.course_id);
  }

  ngOnInit(): void {}

  uploadedFile(event: any) {
    console.log(event);
  }
}
