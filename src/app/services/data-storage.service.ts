import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { AuthService } from "../auth/auth.service";
import { StudentService } from "./student.service";
import { AssignmentService } from "./assignment.service";
import { CohortService } from "./cohort.service";
import { Assignment } from "../models/assignment.model";
import { Student } from "../models/student.model";
import { Cohort } from "../models/cohort.model";
import * as firebase from 'firebase';
import { Observable } from "rxjs/Observable";

@Injectable()
export class DataStorageService {
  constructor(
    private http: Http, 
    private assignmentService: AssignmentService,
    private authService: AuthService,
    private homeService: StudentService,
    private cohortService: CohortService,
    private studentService: StudentService
  ) {}
  // cohorts: Array<any>

  storeAssignmentData(cohortKey, newAssignment) { //stores data via preset criteria (name, description, due)
    firebase.database().ref(`cohorts/${cohortKey}/assignments`).push(newAssignment)    
  }

  storeCompletedAssignmentData() { //aaron's function in the making
    return this.http.put('https://student-portal-4e814.firebaseio.com/assignments.json', this.assignmentService.getAssignments()); 
  }

  // storeStudentData() {
  //   return this.http.put('https://student-portal-4e814.firebaseio.com/users.json', this.studentService.getStudents()); 
  // }

  storeStudentData(cohortKey, newStudent) {
    firebase.database().ref(`cohorts/${cohortKey}/students`).push(newStudent)    
  }

  getData() { //getData was not an automatic feature for Angular => creates path to fetch data and replace existing data (allows add/update/delete without duplicates)
    return firebase.database().ref('cohorts').once('value')
    .then(data => {
      let cohorts = []
      const obj = data.val()
      for (let key in obj){
        var newObject = {
          key: key,
          info: obj[key]
        }
        // console.log(Object.getOwnPropertyNames(obj))
        cohorts.push(newObject)
      }
      return cohorts
    }
    )
  }

  storeCohortData(cohort) {
    // return this.http.put('https://student-portal-4e814.firebaseio.com/cohorts.json', this.cohortService.getCohorts());

    firebase.database().ref('cohorts').push(cohort)
    // .then((data) => {
    //  return data
    // })    
  }
}