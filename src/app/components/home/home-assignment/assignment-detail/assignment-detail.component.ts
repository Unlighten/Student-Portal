import { Component, OnInit } from '@angular/core';
import { CAssignment } from './add-completed-assignment.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Response } from '@angular/http';
import { AddCAssignmentService } from './add-completed-assignment.service'
import { Assignment } from '../../../../models/assignment.model';
import { AssignmentService } from '../../../../services/assignment.service';
import { DataStorageService } from '../../../../services/data-storage.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  AddCAssignmentService: any;  //aaron/wonky
  assignments: Assignment[];
  caAssignments: CAssignment[]; //aaron/wonky
  private subscription: Subscription;
  assignment: Assignment = { //Empty object to fill with modal click
    name: '',
    description: '',
    due: '',
    cohort: ''
  };
  
  constructor(private assignmentService: AssignmentService, private dataStorageService: DataStorageService, private addCAssignmentService: AddCAssignmentService) { }

  ngOnInit() { //Creates and infills assignments onInit
    this.assignments = this.assignmentService.getAssignments();
    // console.log('^ this is printing stuff ^', this.assignments);
    this.caAssignments = this.addCAssignmentService.getCompletedAssignment(); //aaron/wonky
    // console.log('^ this is printing essentially nothing ^', this.caAssignments);
    this.subscription = this.assignmentService.assignmentsChanged.subscribe(
      (assignments: Assignment[]) => {
        this.assignments = assignments;
      }
    );

    this.assignmentService.oneAssignment.subscribe(data => this.assignment = data); //Modal component => Attn. createAssignmentService
  }


  onSubmit(form: NgForm) {
    const completedAssignment = form.value.completedAssignment;
    this.addCAssignmentService.addCompletedAssignment(completedAssignment)
    this.onSaveData()
    form.reset();
  }

  onSaveData() {
    this.dataStorageService.storeCompletedAssignmentData().subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }
}

