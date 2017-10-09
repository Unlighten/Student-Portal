import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './admin/home/home.component';
import { CreateAssignmentComponent } from './admin/create-assignment/create-assignment.component';
import { HomeListComponent } from './admin/home/home-list/home-list.component';
import { HomeStudentComponent } from './admin/home/home-student/home-student.component';
import { HomeItemComponent } from './admin/home/home-list/home-item/home-item.component';
import { CreateEditComponent } from './admin/create-assignment/create-edit/create-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdminComponent,
    HomeComponent,
    CreateAssignmentComponent,
    HomeListComponent,
    HomeStudentComponent,
    HomeItemComponent,
    CreateEditComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
