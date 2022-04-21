import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

const API_URL = environment.apiUrl;

const accessToken = localStorage.getItem('accessToken');
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  user = accessToken
    ? (jwt_decode(accessToken) as {
        role: string;
      })
    : { role: 'learner' };

  getUserInfo(): Observable<any> {
    return this.http.get(API_URL + '/' + this.user.role + '/user/info/');
  }

  updateUserInfo(query: string): Observable<any> {
    return this.http.put(API_URL + '/' + this.user.role + '/user/info/', query);
  }
}
