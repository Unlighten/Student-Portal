import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import { HomeComponent } from "./home/home.component"
import { AuthGuard } from "./auth/auth-guard.service";
import { AuthNullGuard } from "./auth/auth-null-guard.service";
import { CreateEditComponent } from './admin/create-assignment/create-edit/create-edit.component';
import { CreateAssignmentComponent } from './admin/create-assignment/create-assignment.component';
import { AddCohortComponent } from "./admin/add-cohort/add-cohort.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthNullGuard || AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: 'create-assignments', component: CreateAssignmentComponent, canActivate: [AuthGuard] },
  { path: 'add-cohort', component: AddCohortComponent, canActivate: [AuthGuard] }  
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}