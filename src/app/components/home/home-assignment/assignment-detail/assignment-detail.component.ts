import { Component, OnInit, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Response } from '@angular/http';
import { Assignment } from '../../../../models/assignment.model';
import { CAssignment } from '../../../../models/cAssignment.model'
import { AssignmentService } from '../../../../services/assignment.service';
import { DataStorageService } from '../../../../services/data-storage.service';
import { AuthService } from '../../../../auth/auth.service';
import { CohortService } from '../../../../services/cohort.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  updateAssignment: any;
  aKey: any;
  assignments: Assignment[];
  completedAssignment: any;
  private subscription: Subscription;
  private subscription2: Subscription;
  assignment: Assignment = { 
    name: '',
    description: '',
    due: '',
    assignmentKey: '',
    cohort: '',
    completedAssignments: []
  };
  uid
  studentKey
  cohort
  cohorts
  @Output() newCohorts
  cohortKey
  assignmentKey
  completedAssignments
  studentSubmissionKey

  constructor(private assignmentService: AssignmentService, private dataStorageService: DataStorageService, private authService: AuthService, private cohortService: CohortService) { }

  async ngOnInit() { //Creates and infills assignments onInit
    this.assignments = this.assignmentService.getAssignments();
    this.uid = this.authService.getUID()
    this.subscription = this.assignmentService.assignmentsChanged.subscribe(
      (assignments: Assignment[]) => {
        this.assignments = assignments;
      }
    );

    this.subscription2 = this.cohortService.cohortsChanged.subscribe((data) => {
      this.cohorts = data
    })

    await this.assignmentService.oneAssignment.subscribe((data) => {
      if (data) {
          this.assignment = data
          this.aKey = data.assignmentKey
          console.log(data)
        if (this.assignment.completedAssignments) {
          this.completedAssignments = this.assignment.completedAssignments
        } else {
          this.completedAssignments = []
        }
        this.cohorts = this.cohortService.getCohorts2()
        for (let ourCohort of this.cohorts) {
          if (ourCohort.key == this.assignment.cohort) {
            this.cohort = ourCohort
          }
        }
      } else {
        this.completedAssignments = []
      }
    });
    this.cohortKey = this.assignment.cohort
  }

  async onSubmit(form: NgForm) {
    const value = form.value;
    for (let student of this.cohort.info.students) {
      if (this.uid == student.uid) {
        this.studentKey = student.studentKey
      }
    }
    for (let submission of this.completedAssignments) {
      if (submission.student == this.studentKey) {
        
            this.dataStorageService.deleteDuplicateAssignment(this.cohort.key, this.assignment.assignmentKey, submission.submissionKey)
      }
    }
    let sKey = this.studentKey
    for (let student of this.cohort.info.students) {
      if (student.studentKey == this.studentKey) {
        for (let submission of student.studentAssignments) {
          if (submission.assignmentKey == this.assignment.assignmentKey) {
            student.studentSubmissionKey = submission.studentSubmissionKey
          }
        }
        this.dataStorageService.deleteDuplicateStudentSubmission(this.cohort.key, this.studentKey, student.studentSubmissionKey)
      }
    }

    const completedAssignment = {
      student: this.studentKey,
      submission: value.upload,
      assignment: this.assignment.assignmentKey,
      assignmentName: this.assignment.name
    }
    this.onSaveData(this.cohort.key, this.assignment.assignmentKey, completedAssignment, this.studentKey);
    form.reset();
    this.regetAssignment()
  }

  async regetAssignment() {
    this.newCohorts = await this.dataStorageService.getData()
    console.log(this.newCohorts)
    let aKey = this.aKey
    console.log(aKey)
    this.assignmentService.oneAssignment.next()
    for (let cohort of this.newCohorts) {
      if (this.cohort.key == cohort.key) {
        for (let assignment of cohort.info.assignments) {
          if (aKey == assignment.assignmentKey) {
            this.updateAssignment = assignment
            this.assignmentService.oneAssignment.next(this.updateAssignment)
            break;            
          }
        }
      }
    }
    
  }

  onSaveData(cohortKey, assignmentKey, completedAssignment, studentKey) {
    this.dataStorageService.storeCompletedAssignmentData(cohortKey, assignmentKey, completedAssignment, studentKey);
    console.log(completedAssignment, 'this.completedAssignment')
  }
}

