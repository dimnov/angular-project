import { Injectable } from '@angular/core';
import { UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProfileGuard {
  constructor(private router: Router) { }

  canActivate(): boolean | UrlTree {
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';

    if (isAuth) {
      return true;
    } else {
      return this.router.createUrlTree(['/login']);
    }
  }
}