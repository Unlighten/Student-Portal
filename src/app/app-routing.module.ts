import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import { HomeComponent } from "./admin/home/home.component"
import { AuthGuard } from "./auth/auth-guard.service";

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}