import { TeacherModel } from './teacher.model';

export type CourseModel = {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  teacher: TeacherModel;
};
