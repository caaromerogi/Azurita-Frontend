import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  helper = new JwtHelperService();

  isExpired(): boolean {
    return this.helper.isTokenExpired(
      JSON.stringify(window.localStorage.getItem('token'))
    );
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (window.localStorage.getItem('token') && !this.isExpired()) {
      return true;
    }
    this.router.navigate(['login'], {
      queryParams: { redirectURL: state.url },
    });

    return false;
  }
}
