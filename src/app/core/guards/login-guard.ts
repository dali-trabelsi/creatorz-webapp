import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserRole } from '../enums/user-roles';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    @Inject(AuthService) private authService: AuthService,
    @Inject(Router) private router: Router
  ) {}

  public async canActivate(): Promise<boolean> {
    const role = await this.authService.verifyToken();
    if (!role) {
      return true;
    } else {
      if (role === UserRole.TEACHER) {
        this.router.navigate(['course/create']);
      } else if (role === UserRole.LEARNER) {
        this.router.navigate(['courses/list']);
      }
      return false;
    }
  }
}
