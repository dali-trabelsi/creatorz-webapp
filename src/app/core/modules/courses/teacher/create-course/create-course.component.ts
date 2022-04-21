import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from 'src/app/core/services/courses/course.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent implements OnInit {
  cdr: ChangeDetectorRef;

  isLinear = false;
  courseForm: FormGroup;

  constructor(
    cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar
  ) {
    this.cdr = cdr;

    this.courseForm = this.fb.group({
      title: [
        '',
        Validators.compose([Validators.required, Validators.minLength(10)]),
      ],
      description: [
        '',
        Validators.compose([Validators.required, Validators.minLength(10)]),
      ],
    });
  }

  ngOnInit(): void {}

  sections: any[] = [];

  addSection() {
    this.sections.push({ chapters: [{ lessons: [{ elements: [{}] }] }] });
    console.log(this.sections);
  }
  addChapter(s: number) {
    this.sections[s].chapters.push({ lessons: [{ elements: [{}] }] });
    console.log(this.sections);
  }
  addLesson(s: number, c: number) {
    this.sections[s].chapters[c].lessons.push({ elements: [{}] });
    console.log(this.sections);
  }
  addLessonElement(s: number, c: number, l: number) {
    this.sections[s].chapters[c].lessons[l].elements.push({});
    console.log(this.sections);
  }

  thumbnailImgBase64: string | ArrayBuffer | null | undefined;
  thumbnailImgFile: any;

  selectImageFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.thumbnailImgFile = event.target.files[0];
      reader.onload = (e) => {
        this.thumbnailImgBase64 = e?.target?.result;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  create() {
    if (this.courseForm.invalid || !this.thumbnailImgFile) {
      this._snackBar.open('Champs invalides', 'Ok', {
        duration: 3000,
      });
      return;
    }
    const formData = new FormData();
    formData.append('thumbnail', this.thumbnailImgFile);
    formData.append('title', this.courseForm.value.title);
    formData.append('description', this.courseForm.value.description);
    this.service.createCourse(formData).subscribe({
      next: (res) => {
        console.log(res);
        this._snackBar.open('Cours crée', 'Ok', {
          duration: 3000,
        });
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open('Error', 'Ok', {
          duration: 3000,
        });
      },
    });
  }
}
