import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DropdownDirective } from './navbar/dropdown.directives';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './admin/home/home.component';
import { CreateAssignmentComponent } from './admin/create-assignment/create-assignment.component';
import { HomeListComponent } from './admin/home/home-list/home-list.component';
import { HomeStudentComponent } from './admin/home/home-student/home-student.component';
import { CreateEditComponent } from './admin/create-assignment/create-edit/create-edit.component';
import { FooterComponent } from './footer/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthNullGuard } from './auth/auth-null-guard.service';
import { CreateAssignmentService } from './admin/create-assignment/create-assignment.service';
import { DataStorageService } from './shared/data-storage.service';
import { AssignmentListComponent } from './shared/assignment-list/assignment-list.component';
import { HomeDetailComponent } from './admin/home/home-detail/home-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { HomeService } from './admin/home/home.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdminComponent,
    HomeComponent,
    CreateAssignmentComponent,
    DropdownDirective,
    HomeListComponent,
    HomeStudentComponent,
    CreateEditComponent,
    FooterComponent,
    LoginComponent,
    AssignmentListComponent,
    HomeDetailComponent,
    UserComponent,
    UserProfileComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    NgbModule.forRoot(),
  ],
  providers: [
    AuthService,
    AuthGuard,
    AuthNullGuard,
    CreateAssignmentService,
    DataStorageService,
    HomeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
