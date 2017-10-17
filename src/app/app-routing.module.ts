import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import { HomeComponent } from "./home/home.component"
import { AuthGuard } from "./auth/auth-guard.service";
import { AuthNullGuard } from "./auth/auth-null-guard.service";
import { CreateEditComponent } from './admin/create-assignment/create-edit/create-edit.component';
import { CreateAssignmentComponent } from './admin/create-assignment/create-assignment.component';
import { AddCohortComponent } from "./admin/add-cohort/add-cohort.component";
import { CreateStudentComponent } from "./admin/create-student/create-student.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthNullGuard || AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: 'create-assignments', component: CreateAssignmentComponent, canActivate: [AuthGuard] },
<<<<<<< HEAD
  { path: 'add-cohort', component: AddCohortComponent, canActivate: [AuthGuard] },
=======
  { path: 'add-cohort', component: AddCohortComponent, canActivate: [AuthGuard] },  
>>>>>>> 1049ff1e7bcf8a71350acca04a2ddc02018a34d0
  { path: 'create-students', component: CreateStudentComponent, canActivate: [AuthGuard] }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}