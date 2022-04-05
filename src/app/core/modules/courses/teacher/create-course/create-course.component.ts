import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent implements OnInit {
  cdr: ChangeDetectorRef;
  constructor(cdr: ChangeDetectorRef) {
    this.cdr = cdr;
  }

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

  richTextDataModel: any;

  ngOnInit(): void {}

  imgSelectPreview: any;

  selectImageFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (e) => {
        this.imgSelectPreview = e?.target?.result;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  create() {
    console.log(this.richTextDataModel);
  }
}
