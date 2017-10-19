import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import { AuthGuard } from "./auth/auth-guard.service";
import { AuthNullGuard } from "./auth/auth-null-guard.service";
import { HomeComponent } from "./components/home/home.component";
import { CreateAssignmentComponent } from "./components/admin/create-assignment/create-assignment.component";
import { AddCohortComponent } from "./components/admin/add-cohort/add-cohort.component";
import { CreateStudentComponent } from "./components/admin/create-student/create-student.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthNullGuard || AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: 'create-assignments', component: CreateAssignmentComponent, canActivate: [AuthGuard] },
  { path: 'add-cohort', component: AddCohortComponent, canActivate: [AuthGuard] },
  { path: 'create-students', component: CreateStudentComponent, canActivate: [AuthGuard] }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}