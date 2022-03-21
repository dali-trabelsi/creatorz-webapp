import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  signupForm: FormGroup;
  JSON: JSON;
  serverMsg = '';
  serverMsgType = 'success';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.JSON = JSON;
    this.signupForm = this.fb.group({
      user: ['learner'],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fname: ['', [Validators.required, Validators.minLength(2)]],
      lname: ['', [Validators.required, Validators.minLength(2)]],
      dob: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      postcode: [
        '',
        [Validators.required, Validators.min(1000), Validators.max(9999)],
      ],
    });
  }

  ngOnInit(): void {}

  signup() {
    this.serverMsg = '';
    const form = this.signupForm.value;
    const body = {
      ...form,
      address: {
        country: form.country,
        city: form.city,
        street: form.street,
        postcode: form.postcode,
      },
    };
    this.http
      .post<{ message: string }>(
        `https://creatorz.herokuapp.com/api/v1/auth/${body.user}/signup`,
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
      this.signupForm.get(field)?.invalid &&
      (this.signupForm.get(field)?.dirty || this.signupForm.get(field)?.touched)
    );
  }
}
