import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.JSON = JSON;
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      user: ['learner'],
    });
  }

  ngOnInit(): void {}

  login() {
    this.serverMsg = '';
    const body = this.loginForm.value;
    this.http
      .post<{ message: string }>(
        `https://creatorz.herokuapp.com/api/v1/auth/${body.user}/signin`,
        body
      )
      .subscribe({
        next: (x: { message: string }) => {
          console.log('Observer got a next value: ');
          this.serverMsg = x.message;
          this.serverMsgType = 'success';
        },
        error: (err) => {
          console.error('Observer got an error: ', err);
          this.serverMsg = err.error.message;
          this.serverMsgType = 'danger';
        },
        complete: () => console.log('Observer got a complete notification'),
      });
  }

  fieldIsInvalid(field: string): boolean | undefined {
    return (
      this.loginForm.get(field)?.invalid &&
      (this.loginForm.get(field)?.dirty || this.loginForm.get(field)?.touched)
    );
  }
}
