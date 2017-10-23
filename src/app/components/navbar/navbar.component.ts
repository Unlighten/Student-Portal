import { Component, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  constructor(
    private authService: AuthService,
    // private addCohortService: AddCohortService, 
    // private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    // this.dataStorageService.getData();
    // this.cohorts = this.addCohortService.getCohorts();
  }

  @Output() featureSelected = new Subject<string>();
  onSelect(feature: string) {
    this.featureSelected.next(feature);
  }

  onLogout() {
    this.authService.logout();
  }
}