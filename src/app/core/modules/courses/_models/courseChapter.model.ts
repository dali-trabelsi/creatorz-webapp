import { CourseLesson } from './courseLesson.model';

export type CourseChapter = {
  _id: string;
  title: string;
  lessons: CourseLesson[];
};
