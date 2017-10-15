import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import { HomeComponent } from "./admin/home/home.component"
import { AuthGuard } from "./auth/auth-guard.service";
import { AuthNullGuard } from "./auth/auth-null-guard.service";
import { CreateEditComponent } from './admin/create-assignment/create-edit/create-edit.component';
import { CreateAssignmentComponent } from './admin/create-assignment/create-assignment.component';
import { UserComponent } from './user/user.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthNullGuard || AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: 'profile-placeholder', component: UserComponent, canActivate: [AuthNullGuard || AuthGuard]  },
  { path: 'create-assignments', component: CreateAssignmentComponent, canActivate: [AuthGuard] }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}