import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import jwtDecode from 'jwt-decode';

const API_URL = environment.apiUrl;
const token = jwtDecode(localStorage.getItem('accessToken') || '') as {
  role: string;
};

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  createCourse(formData: any): Observable<any> {
    return this.http.post(API_URL + '/course/create', formData);
  }

  getMyCourses(): Observable<any> {
    return this.http.get(API_URL + '/' + token.role + '/my/courses/');
  }

  getAllCourses(): Observable<any> {
    return this.http.get(API_URL + '/course/list/all');
  }
}
