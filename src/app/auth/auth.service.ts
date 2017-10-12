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
          response.uid == firebaseConfig.adminUIDs[0] ? console.log("Admin") : console.log("not Admin")
          this.router.navigate(['/home']);
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

  getID() {
    return new Promise((resolve, reject) =>{
      firebase.auth().onAuthStateChanged((user) => {
        // console.log(2, user.uid)
        resolve(user.uid)
      })
    })    
  }

  isAuthenticated() {
    return this.token != null; //if there is a token, return true... it always returns true
  }

  isAdminAuthenticated(uid) {
    // console.log(4, uid)
    if (uid == firebaseConfig.adminUIDs[0]){ 
      // console.log(5, uid);
      // return uid != null;
      return this.token != null;
    }
    }
  }