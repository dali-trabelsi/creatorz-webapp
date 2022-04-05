import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { UserRole } from 'src/app/core/enums/user-roles';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  JSON: JSON;
  serverMsg = '';
  serverMsgType = 'success';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    @Inject(Router) private router: Router
  ) {
    this.JSON = JSON;
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userType: ['learner'],
    });
  }

  ngOnInit(): void {}

  login() {
    this.serverMsg = '';
    const body = this.loginForm.value;
    this.http
      .post<{ message: string; accessToken: string; id: string }>(
        environment.apiUrl + `/auth/${body.userType}/signin`,
        body
      )
      .subscribe({
        next: (x: { message: string; accessToken: string; id: string }) => {
          localStorage.setItem('accessToken', x.accessToken);
          const decodedToken = jwtDecode(x.accessToken) as { role: UserRole };
          localStorage.setItem('user_id', x.id);
          if (decodedToken.role === UserRole.LEARNER) {
            this.router.navigate(['courses/list']);
          } else if (decodedToken.role === UserRole.TEACHER) {
            this.router.navigate(['course/create']);
          }
          this.serverMsg = x.message;
          this.serverMsgType = 'success';
        },
        error: (err) => {
          console.error('Observer got an error: ', err);
          this.serverMsg = err.error.message;
          this.serverMsgType = 'danger';
        },
        complete: () => {},
      });
  }

  fieldIsInvalid(field: string): boolean | undefined {
    return (
      this.loginForm.get(field)?.invalid &&
      (this.loginForm.get(field)?.dirty || this.loginForm.get(field)?.touched)
    );
  }
}
