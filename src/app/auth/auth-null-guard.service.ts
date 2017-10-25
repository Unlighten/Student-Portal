import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthNullGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let uid = await this.authService.getID()
    // return this.authService.isAdminAuthenticated(uid) && this.authService.isAuthenticated()
    return this.authService.isAuthenticated(uid)
  }
}