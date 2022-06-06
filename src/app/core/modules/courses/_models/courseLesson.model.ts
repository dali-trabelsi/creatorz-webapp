import { CourseLessonElement } from './courseLessonElement.model';

export type CourseLesson = {
  _id: string;
  title: string;
  elements: CourseLessonElement[];
};
