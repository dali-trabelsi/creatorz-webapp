import { CourseChapter } from './courseChapter.model';

export type CourseSection = {
  _id: string;
  title: string;
  course: string;
  order: number;
  chapters: CourseChapter[];
};
