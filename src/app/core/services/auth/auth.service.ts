import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { UserRole } from '../../enums/user-roles';
import { TokenStorageService } from './token-storage.service';
import { environment } from 'src/environments/environment';
const AUTH_API_URL = 'http://localhost:8080/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService extends TokenStorageService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenStorageService
  ) {
    super();
  }
  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API_URL + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API_URL + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  public verifyToken(roles?: UserRole[]): Promise<boolean | string> {
    const accessToken = this.tokenService.getToken();
    return new Promise((resolve, reject) => {
      if (!accessToken) {
        resolve(false);
      }
      const decodedToken = jwt_decode(String(accessToken)) as {
        role: UserRole;
      };
      if (roles && !roles.includes(decodedToken.role)) {
        resolve(false);
      }
      this.http
        .post(
          environment.apiUrl + '/auth/verifyToken/' + decodedToken.role,
          {},
          {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            }),
          }
        )
        .subscribe((res) => {
          resolve(decodedToken.role);
        });
    });
  }
}
