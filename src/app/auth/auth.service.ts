import * as firebase from 'firebase';
import firebaseConfig from '../../../firebaseConfig'
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router) {}

  loginUser(email: string, password: string) {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          response.uid == firebaseConfig.adminTokens[0] ? console.log("Admin") : console.log("not Admin")

          this.router.navigate(['/create-assignments']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                this.token = token
              }
            )
        }
      )
    }
  

  logout() {
    firebase.auth().signOut()
      .then(
        response => {
          this.router.navigate(['/login']);
        }
      );
    this.token = null;
  }

  getIdToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  isAdminAuthenticated() {
    return this.token != null;
  }
}