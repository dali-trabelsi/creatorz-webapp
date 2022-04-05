import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { UserRole } from '../enums/user-roles';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthService) private authService: AuthService,
    @Inject(Router) private router: Router
  ) {}

  public async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    if (route.data && route.data['roles']) {
      const access = await this.authService.verifyToken(
        route.data['roles'] as UserRole[]
      );
      if (!access) {
        this.router.navigate(['login']);
        return false;
      } else return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
