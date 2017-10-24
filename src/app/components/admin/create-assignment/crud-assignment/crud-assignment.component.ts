import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Response } from '@angular/http';
import { Assignment } from '../../../../models/assignment.model';
import { Cohort } from '../../../../models/cohort.model';
import { AssignmentService } from '../../../../services/assignment.service';
import { CohortService } from '../../../../services/cohort.service';
import { DataStorageService } from '../../../../services/data-storage.service';

@Component({
  selector: 'app-crud-assignment',
  templateUrl: './crud-assignment.component.html',
  styleUrls: ['./crud-assignment.component.css']
})
export class CrudAssignmentComponent implements OnInit, OnDestroy {
  @ViewChild('f') createAssignmentForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Assignment;
  cohorts
  
  constructor(private assignmentService: AssignmentService, private dataStorageService: DataStorageService, private cohortService: CohortService) { }

  ngOnInit() {
    this.subscription = this.assignmentService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.assignmentService.getAssignment(index);
        this.createAssignmentForm.setValue({
          name: this.editedItem.name,
          desc: this.editedItem.description,
          due: this.editedItem.due,
          cohort: this.editedItem.cohort
        });
      }
    );
    this.cohorts = this.cohortService.receiveCohorts();       
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newAssignment = new Assignment(
      value.name, 
      value.desc, 
      value.due, 
      value.cohort
    );
    const cohortKey = value.cohort
    if (this.editMode) {
      this.assignmentService.updateAssignment(this.editedItemIndex, newAssignment);
      this.onSaveData(cohortKey, newAssignment);
    } else {
      this.assignmentService.addAssignment(newAssignment);
      this.onSaveData(cohortKey, newAssignment);
    }
    this.editMode = false;
    form.reset();
  }

  onSaveData(cohortKey, newAssignment) {
    this.dataStorageService.storeAssignmentData(cohortKey, newAssignment)
    // this.assignmentService.clearAssignments();
  }

  onClear() {
    this.createAssignmentForm.reset();
    this.editMode = false;
  }

  // onDelete() {
  //   this.assignmentService.deleteAssignment(this.editedItemIndex);
  //   this.onClear();
  //   this.onSaveData();
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}