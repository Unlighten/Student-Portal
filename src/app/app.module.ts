import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DropdownDirective } from './navbar/dropdown.directives';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { CreateAssignmentComponent } from './admin/create-assignment/create-assignment.component';
import { HomeStudentComponent } from './home/home-student/home-student.component';
import { CreateEditComponent } from './admin/create-assignment/create-edit/create-edit.component';
import { FooterComponent } from './footer/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthNullGuard } from './auth/auth-null-guard.service';
import { CreateAssignmentService } from './admin/create-assignment/create-assignment.service';
import { DataStorageService } from './shared/data-storage.service';
import { AssignmentListComponent } from './shared/assignment-list/assignment-list.component';
import { HomeAssignmentComponent } from './home/home-assignment/home-assignment.component';
import { AssignmentDetailComponent } from './home/home-assignment/assignment-detail/assignment-detail.component';
import { StudentService } from './shared/student.service';
import { StudentDetailComponent } from './home/home-student/student-detail/student-detail.component';
import { StudentListComponent } from './shared/student-list/student-list.component';
import { AddCohortComponent } from './admin/add-cohort/add-cohort.component';
import { AddCohortService } from './admin/add-cohort/add-cohort.service';
import { CreateStudentComponent } from './admin/create-student/create-student.component';
import { EditStudentComponent } from './admin/create-student/edit-student/edit-student.component';
import { SelectCohortComponent } from './admin/select-cohort/select-cohort.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdminComponent,
    HomeComponent,
    CreateAssignmentComponent,
    DropdownDirective,
    HomeAssignmentComponent,
    HomeStudentComponent,
    CreateEditComponent,
    FooterComponent,
    LoginComponent,
    AssignmentListComponent,
    AssignmentDetailComponent,
    StudentListComponent,
    StudentDetailComponent,
    AddCohortComponent,
    CreateStudentComponent,
    EditStudentComponent,
    SelectCohortComponent
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
    CreateAssignmentService,
    DataStorageService,
    StudentService,
    AddCohortService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
