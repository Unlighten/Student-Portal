import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    private authService: AuthService
  ) {}

  @Output() featureSelected = new Subject<string>();

  onSelect(feature: string) {
    this.featureSelected.next(feature);
  }

  onLogout() {
    this.authService.logout();
  }
}