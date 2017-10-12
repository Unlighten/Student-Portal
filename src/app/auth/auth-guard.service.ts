import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // console.log(1, "Before getID()")
    let uid = await this.authService.getID()
    // console.log(3, uid)
    return this.authService.isAdminAuthenticated(uid) && this.authService.isAuthenticated()
  }
}