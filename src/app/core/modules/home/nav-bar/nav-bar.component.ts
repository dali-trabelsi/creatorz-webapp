import jwt_decode from 'jwt-decode';
import { AuthService } from './../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/user/users.service';
import { UserModel } from 'src/app/core/models/user.model';
import { environment } from 'src/environments/environment';
import { UserRole } from 'src/app/core/enums/user-roles';

@Component({
  selector: 'home-page-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(
    @Inject(Router) public router: Router,
    public auth: AuthService,
    private userService: UsersService
  ) {}
  isLoggedIn: boolean = false;
  showDrawer: boolean = true;

  user!: UserModel;

  ngOnInit(): void {
    const url = this.router.url;
    if (!['/', '/login', '/signup', '/contact'].includes(url)) {
      this.isLoggedIn = true;
    }
    this.auth.getToken() && this.fetchUserDetails();

    this.token = this.isLoggedIn
      ? jwt_decode(localStorage.getItem('accessToken') || '')
      : { role: '' };
    this.userRole = this.token?.role.toUpperCase() as UserRole;
  }

  token!: { role: string };
  userRole!: string;
  UserRole = UserRole;
  fetchUserDetails() {
    this.userService.getUserInfo().subscribe({
      next: (res: UserModel) => {
        this.user = res;
        this.user.avatar = this.user.avatar
          ? environment.apiUrl + '/media/' + this.user.avatar
          : environment.userAvatarImgPlaceholder;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
