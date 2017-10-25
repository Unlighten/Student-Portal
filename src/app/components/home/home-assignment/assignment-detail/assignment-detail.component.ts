import { Component, OnInit } from '@angular/core';
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
  assignments: Assignment[];
  completedAssignment: any;
  private subscription: Subscription;
  private cohortSubscription: Subscription
  assignment: Assignment = { //Empty object to fill with modal click
    name: '',
    description: '',
    due: '',
    cohort: ''
  };
  uid
  studentKey
  cohort
  cohorts
  cohortKey

  //==============================================================
  //assignment needs uploadedAssignment field or...
  //==============================================================

  cassignment = { //Empty object to fill with modal click
    uid: this.uid,
    uploadedAssignment: ''
  };

  constructor(private assignmentService: AssignmentService, private dataStorageService: DataStorageService, private authService: AuthService, private cohortService: CohortService) { }

  async ngOnInit() { //Creates and infills assignments onInit
    this.assignments = this.assignmentService.getAssignments();
    this.uid = this.authService.getUID()
    // this.cohort = this.assignment.cohortKey
    this.subscription = this.assignmentService.assignmentsChanged.subscribe(
      (assignments: Assignment[]) => {
        this.assignments = assignments;
      }
    );

    await this.assignmentService.oneAssignment.subscribe((data) => {
      this.assignment = data
      this.cohorts = this.cohortService.getCohorts2()
      for (let ourCohort of this.cohorts) {
        console.log(ourCohort)
        console.log('this assignment thing ', this.assignment.cohort)
        if (ourCohort.key == this.assignment.cohort) {
          this.cohort = ourCohort
          console.log('ourt cohort ', this.cohort)
        }
      }
    }); //Modal component => Attn. assignmentService
    
    // await this.cohortService.cohortsChanged.subscribe(
    //     (cohorts) => {
    //       this.cohorts = cohorts;
          
    //     }
        
    // )

    this.cohortKey = this.assignment.cohort
    // this.cohort = this.cohorts.key[this.assignment.cohort]
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    console.log('this.assignment cohort key ', this.assignment.cohort)
    console.log('cohorts ', this.cohorts)
    console.log('this cohort ', this.cohort)
    console.log('uid ', this.uid)
    for (let student of this.cohort.info.students) {
      if (this.uid == this.cohort.info.students.student.uid) {
        this.studentKey = this.cohort.info.students.student.studentKey
      }
    }
    // const completedAssignment = new CAssignment(
    //   value.name, 
    //   value.desc, 
    //   value.due, 
    //   value.cohort,
    //   value.uploadedAssignment
    // );
    const cohortKey = value.cohort;
    console.log('this cohort ', value.cohort)
    // this.onSaveData(cohortKey, assignmentKey, completedAssignment);
    form.reset();
  }

  onSaveData(cohortKey, assignmentKey, completedAssignment) {
    this.dataStorageService.storeCompletedAssignmentData(cohortKey, assignmentKey, completedAssignment);
    console.log(this.completedAssignment, 'this.completedAssignment')
  }
}

