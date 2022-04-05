import { AuthService } from './../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'home-page-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(
    @Inject(Router) private router: Router,
    public auth: AuthService
  ) {}
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    const url = this.router.url;
    if (['/course/create', '/courses/list'].includes(url)) {
      this.isLoggedIn = true;
    }
  }
}
