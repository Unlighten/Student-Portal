import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './admin/home/home.component';
import { CreateAssignmentComponent } from './admin/create-assignment/create-assignment.component';
import { HomeListComponent } from './admin/home/home-list/home-list.component';
import { HomeDetailComponent } from './admin/home/home-detail/home-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdminComponent,
    HomeComponent,
    CreateAssignmentComponent,
    HomeListComponent,
    HomeDetailComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
