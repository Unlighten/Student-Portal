import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Response } from '@angular/http';
import { Assignment } from '../../../../models/assignment.model';
import { CAssignment } from '../../../../models/cAssignment.model'
import { AssignmentService } from '../../../../services/assignment.service';
import { DataStorageService } from '../../../../services/data-storage.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  assignments: Assignment[];
  completedAssignment: any;
  private subscription: Subscription;
  assignment: Assignment = { //Empty object to fill with modal click
    name: '',
    description: '',
    due: '',
    cohort: ''
  };

  //==============================================================
  //assignment needs uploadedAssignment field or...
  //==============================================================

  cassignment: CAssignment = { //Empty object to fill with modal click
    name: '',
    description: '',
    due: '',
    cohort: '',
    uploadedAssignment: ''
  };
  
  constructor(private assignmentService: AssignmentService, private dataStorageService: DataStorageService) { }

  ngOnInit() { //Creates and infills assignments onInit
    this.assignments = this.assignmentService.getAssignments();
    this.subscription = this.assignmentService.assignmentsChanged.subscribe(
      (assignments: Assignment[]) => {
        this.assignments = assignments;
      }
    );

    this.assignmentService.oneAssignment.subscribe(data => this.assignment = data); //Modal component => Attn. assignmentService
  }

  // onSubmit(form: NgForm) {
  //   const value = form.value;
  //   const completedAssignment = new CAssignment(
  //     value.name, 
  //     value.desc, 
  //     value.due, 
  //     value.cohort,
  //     value.uploadedAssignment
  //   );
  //   const cohortKey = value.cohort;
  //   this.onSaveData(cohortKey, assignmentKey, completedAssignment);
  //   form.reset();
  // }

  // onSaveData(cohortKey, assignmentKey, completedAssignment) {
  //     this.dataStorageService.storeCompletedAssignmentData(cohortKey, assignmentKey, completedAssignment);
  //     console.log(this.completedAssignment, 'this.completedAssignment')
  // }
}

