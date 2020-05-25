import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot,  Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { ConstantService } from './services/constant.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];  route: ActivatedRouteSnapshot;

  constructor(private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!localStorage.getItem(ConstantService.localStorage.userNameKey)) {
      this.router.navigate(['/identification'])
    }
    return true;
  }
}
