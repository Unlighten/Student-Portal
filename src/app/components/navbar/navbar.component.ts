import { Component, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AuthService } from '../../auth/auth.service';
import { NavbarService } from '../../services/navbar.service';
import firebaseConfig from '../../../../firebaseConfig'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAdmin: boolean;

  constructor(
    private authService: AuthService, public nav: NavbarService) {}

  ngOnInit() {
    console.log('HELLO')
    this.authService.getID()
      .then((uid) => {
        if (uid == firebaseConfig.adminUIDs[0]) {
          this.isAdmin = true;
          console.log('is admin', this.isAdmin)
        }
      })
  }

  @Output() featureSelected = new Subject<string>();
  onSelect(feature: string) {
    this.featureSelected.next(feature);
  }

  

  onLogout() {
    this.authService.logout();
    window.location.reload();
  }
}