import { Component, OnInit } from '@angular/core';
import { Assignment } from '../../../shared/assignment.model';
import { CAssignment } from './add-completed-assignment.model';
import { NgForm } from '@angular/forms';
import { DataStorageService } from '../../../shared/data-storage.service';
import { Subscription } from 'rxjs/Subscription';
import { CreateAssignmentService } from '../../../admin/create-assignment/create-assignment.service';
import { Response } from '@angular/http';
import { AddCAssignmentService } from './add-completed-assignment.service'

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
  
  constructor(private createAssignmentService: CreateAssignmentService, private dataStorageService: DataStorageService, private addCAssignmentService: AddCAssignmentService) { }

  ngOnInit() { //Creates and infills assignments onInit
    this.assignments = this.createAssignmentService.getAssignments();
    // console.log('^ this is printing stuff ^', this.assignments);
    this.caAssignments = this.addCAssignmentService.getCompletedAssignment(); //aaron/wonky
    // console.log('^ this is printing essentially nothing ^', this.caAssignments);
    this.subscription = this.createAssignmentService.assignmentsChanged.subscribe(
      (assignments: Assignment[]) => {
        this.assignments = assignments;
      }
    );
    console.log(this.assignments);

    this.createAssignmentService.oneAssignment.subscribe(data => this.assignment = data); //Modal component => Attn. createAssignmentService
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

