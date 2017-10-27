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

  storeAssignmentData(cohortKey, newAssignment) { //stores data via preset criteria (name, description, due)
    firebase.database().ref(`cohorts/${cohortKey}/assignments`).push(newAssignment)    
  }

  updateAssignmentData(cohortKey, newAssignment, assignmentKey) { //stores data via preset criteria (name, description, due)
    firebase.database().ref(`cohorts/${cohortKey}/assignments/${assignmentKey}`).set(newAssignment)    
  }

  deleteAssignmentData(cohortKey, assignmentKey) {
    firebase.database().ref(`cohorts/${cohortKey}/assignments/${assignmentKey}`).remove()
  }

  storeCompletedAssignmentData(cohortKey, assignmentKey, completedAssignment, studentKey) { //aaron's function in the making
    firebase.database().ref(`cohorts/${cohortKey}/assignments/${assignmentKey}/completedAssignments`).push(completedAssignment)
    firebase.database().ref(`cohorts/${cohortKey}/students/${studentKey}/studentAssignments`).push(completedAssignment)
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
  
  deleteDuplicateAssignment(cohortKey, assignmentKey, submissionKey) {
    firebase.database().ref(`cohorts/${cohortKey}/assignments/${assignmentKey}/completedAssignments/${submissionKey}`).remove()
  }

  deleteDuplicateStudentSubmission(cohortKey, studentKey, studentSubmissionKey) {
    firebase.database().ref(`cohorts/${cohortKey}/students/${studentKey}/studentAssignments/${studentSubmissionKey}`).remove()
  }
  
  getData() { 
    return firebase.database().ref('cohorts').once('value')
    .then(data => {
      let cohorts = [];
      const obj = data.val()
      for (let key in obj){
        let assignments = []; 
        let students = [];    
        for (let assignmentKey in obj[key].assignments){ 
          let completedAssignments = [];
          for (let completion in obj[key].assignments[assignmentKey].completedAssignments) {
            var cAssignmentsObject = {
              student: obj[key].assignments[assignmentKey].completedAssignments[completion].student,
              studentFName: obj[key].students[obj[key].assignments[assignmentKey].completedAssignments[completion].student].fname,
              studentLName: obj[key].students[obj[key].assignments[assignmentKey].completedAssignments[completion].student].lname,
              submission: obj[key].assignments[assignmentKey].completedAssignments[completion].submission,
              submissionKey: completion
            }
            completedAssignments.push(cAssignmentsObject)
          }
          var assignmentsObject = {
              name: obj[key].assignments[assignmentKey].name,
              cohort: obj[key].assignments[assignmentKey].cohort,
              due: obj[key].assignments[assignmentKey].due,
              description: obj[key].assignments[assignmentKey].description,
              completedAssignments: completedAssignments,
              assignmentKey: assignmentKey
          }      
          assignments.push(assignmentsObject)
        } 
          for (let studentKey in obj[key].students){
            let studentAssignments = [];          
            for (let completion in obj[key].students[studentKey].studentAssignments) {
              var sAssignmentsObject = {
                student: obj[key].students[studentKey].studentAssignments[completion].student,
                assignmentName: obj[key].students[studentKey].studentAssignments[completion].assignmentName, 
                assignmentKey: obj[key].students[studentKey].studentAssignments[completion].assignment,
                submission: obj[key].students[studentKey].studentAssignments[completion].submission,
                studentSubmissionKey: completion
              }
              studentAssignments.push(sAssignmentsObject);
            }

            var studentsObject = {
              cohort: obj[key].students[studentKey].cohort,
              fname: obj[key].students[studentKey].fname,
              lname: obj[key].students[studentKey].lname,
              email: obj[key].students[studentKey].email,
              uid: obj[key].students[studentKey].uid,
              studentAssignments: studentAssignments,
              studentKey: studentKey
            }
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

  deleteCohort(cohortKey) {
    firebase.database().ref(`cohorts/${cohortKey}`).remove()
  }

  updateCohort(cohortKey, newName) {
    firebase.database().ref(`cohorts/${cohortKey}`).set(newName)
  }

  storeCohortData(cohort) {
    firebase.database().ref('cohorts').push(cohort)
  }
}