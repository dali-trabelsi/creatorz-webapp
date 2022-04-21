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
export class UsersService {
  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<any> {
    return this.http.get(API_URL + '/' + token.role + '/user/info/');
  }

  updateUserInfo(query: string): Observable<any> {
    return this.http.put(API_URL + '/' + token.role + '/user/info/', query);
  }
}
