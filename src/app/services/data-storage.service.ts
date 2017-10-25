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
import { CAssignment } from "../models/cAssignment.model";

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

  updateAssignmentData(cohortKey, newAssignment, assignmentKey) { //stores data via preset criteria (name, description, due)
    firebase.database().ref(`cohorts/${cohortKey}/assignments/${assignmentKey}`).set(newAssignment)    
  }

  deleteAssignmentData(cohortKey, assignmentKey) {
    firebase.database().ref(`cohorts/${cohortKey}/assignments/${assignmentKey}`).remove()
  }

  storeCompletedAssignmentData() { //aaron's function in the making
    return this.http.put('https://student-portal-4e814.firebaseio.com/assignments.json', this.assignmentService.getAssignments()); 
  }

  updateStudentData(cohortKey, newStudent, studentKey) {
    firebase.database().ref(`cohorts/${cohortKey}/students/${studentKey}`).set(newStudent)
  }

  storeStudentData(cohortKey, newStudent) {
    firebase.database().ref(`cohorts/${cohortKey}/students`).push(newStudent)    
  }

  deleteStudentData(cohortKey, studentKey) {
    firebase.database().ref(`cohorts/${cohortKey}/students/${studentKey}`).remove()
  }

  getData() { //getData was not an automatic feature for Angular => creates path to fetch data and replace existing data (allows add/update/delete without duplicates)
    return firebase.database().ref('cohorts').once('value')
    .then(data => {
      let cohorts = [];
      const obj = data.val()
      for (let key in obj){
        let assignments = []; 
        let students = [];                 
        for (let assignmentKey in obj[key].assignments){ 
          var assignmentsObject = {
              name: obj[key].assignments[assignmentKey].name,
              cohort: obj[key].assignments[assignmentKey].cohort,
              due: obj[key].assignments[assignmentKey].due,
              description: obj[key].assignments[assignmentKey].description,
              assignmentKey: assignmentKey
          }      
          assignments.push(assignmentsObject)
        }  
          for (let studentKey in obj[key].students){
            var studentsObject = {
              cohort: obj[key].students[studentKey].cohort,
              fname: obj[key].students[studentKey].fname,
              lname: obj[key].students[studentKey].lname,
              email: obj[key].students[studentKey].email,
              studentKey: studentKey
            }
            // console.log(studentsObject)
            students.push(studentsObject)
          }        
          var newObject = {
            key: key,
            info: {
              assignments: assignments,
              students: students,
              cohortName: obj[key].cohortName
            }
          }
          cohorts.push(newObject)
      }
      return cohorts
    }
    )
  }

  storeCohortData(cohort) {
    firebase.database().ref('cohorts').push(cohort)
  }
}