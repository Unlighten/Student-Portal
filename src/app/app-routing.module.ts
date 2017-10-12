import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import { HomeComponent } from "./admin/home/home.component"
import { AuthGuard } from "./auth/auth-guard.service";
import { CreateEditComponent } from './admin/create-assignment/create-edit/create-edit.component';
import { CreateAssignmentComponent } from './admin/create-assignment/create-assignment.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-assignments', component: CreateAssignmentComponent, canActivate: [AuthGuard] }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}