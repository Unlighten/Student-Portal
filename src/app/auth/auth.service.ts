import * as firebase from 'firebase';
import firebaseConfig from '../../../firebaseConfig'
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  token: string;
  uid: string;

  constructor(private router: Router) {}

  loginUser(email: string, password: string) {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          response.uid == firebaseConfig.adminUIDs[0] ? console.log("Welcome back Admin!") : console.log("Welcome back User!")
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
          console.log(6, 'You logged out!');
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
    return this.token != null; //if there is a token, return true... it always returns true.. its the user
  }

  //for some reason... this function is running many times...
  isAdminAuthenticated(uid) {
    // console.log(4, uid)
    if (uid == firebaseConfig.adminUIDs[0]){ 
      console.log(5, uid);
      // return uid != null;
      return this.token != null;
    } else {
      return null;
    }
  }
}

//the current issue is that the tabs will show to everyone other than people without a token.

//which means the user can see the admin tabs, but cannot access them
//in order to fix this, we need to fix the isAdminAuthenticated function.

//when the isAdminAuthenticated function is called in the html file, uid is undefined.

//when isAuthenticated is called in html, then it is back to the same issue discussed on line 75+.

//there is also an issue.. for some reason... where isAdminAuthenticated runs a bunch of times when
//it is actually called...
//it could have something to do with checking if the user is authenticated, a bunch of times

//isAdminAuthenticated runs when isAuthenticated is called in the html, meaning you can
//get the uid;
//it also does not loop, unless isAdminAuthenticated is called in the html

//there needs to be a way to hide the elements from the user, instead of just locking them