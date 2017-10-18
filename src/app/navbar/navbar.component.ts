import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs/Subject';
import { AddCohortService } from '../admin/add-cohort/add-cohort.service';
import { Cohort } from '../admin/add-cohort/cohort.model';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  cohorts: Cohort[];
  
  constructor(
    private authService: AuthService,
    private addCohortService: AddCohortService, 
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.dataStorageService.getData();
    console.log('cohorts nav ', this.cohorts) 
    this.cohorts = this.addCohortService.getCohorts();
    console.log('cohorts ', this.cohorts)   
  }

  @Output() featureSelected = new Subject<string>();
  onSelect(feature: string) {
    this.featureSelected.next(feature);
  }

  onLogout() {
    this.authService.logout();
  }
}