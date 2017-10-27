import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthNullGuard } from './auth/auth-null-guard.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { CreateAssignmentComponent } from './components/admin/create-assignment/create-assignment.component';
import { HomeAssignmentComponent } from './components/home/home-assignment/home-assignment.component';
import { HomeStudentComponent } from './components/home/home-student/home-student.component';
import { CrudAssignmentComponent } from './components/admin/create-assignment/crud-assignment/crud-assignment.component';
import { FooterComponent } from './components/footer/footer.component';
import { AssignmentListComponent } from './components/shared/assignment-list/assignment-list.component';
import { AssignmentDetailComponent } from './components/home/home-assignment/assignment-detail/assignment-detail.component';
import { StudentListComponent } from './components/shared/student-list/student-list.component';
import { StudentDetailComponent } from './components/home/home-student/student-detail/student-detail.component';
import { AddCohortComponent } from './components/admin/add-cohort/add-cohort.component';
import { CrudStudentComponent } from './components/admin/create-student/crud-student/crud-student.component';
import { CreateStudentComponent } from './components/admin/create-student/create-student.component';
import { SelectCohortComponent } from './components/shared/select-cohort/select-cohort.component';
import { AssignmentService } from './services/assignment.service';
import { DataStorageService } from './services/data-storage.service';
import { StudentService } from './services/student.service';
import { CohortService } from './services/cohort.service';
import { CrudCohortComponent } from './components/admin/add-cohort/crud-cohort/crud-cohort.component';
import { NavbarService } from './services/navbar.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdminComponent,
    HomeComponent,
    CreateAssignmentComponent,
    HomeAssignmentComponent,
    HomeStudentComponent,
    CrudAssignmentComponent,
    FooterComponent,
    LoginComponent,
    AssignmentListComponent,
    AssignmentDetailComponent,
    StudentListComponent,
    StudentDetailComponent,
    AddCohortComponent,
    CrudStudentComponent,
    CreateStudentComponent,
    SelectCohortComponent,
    CrudCohortComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    AuthNullGuard,
    AssignmentService,
    DataStorageService,
    StudentService,
    CohortService,
    NavbarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
