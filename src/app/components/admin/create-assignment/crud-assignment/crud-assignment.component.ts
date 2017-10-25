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
  assignmentKey 
  newAssignment

  constructor(private assignmentService: AssignmentService, private dataStorageService: DataStorageService, private cohortService: CohortService) { }

  ngOnInit() {
    this.subscription = this.assignmentService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.assignmentService.getAssignment(index);
        this.assignmentKey = this.assignmentService.getAssignment(index)
        console.log('assignment key ', this.assignmentKey.assignmentKey)
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
    console.log('value ', value.name)
    this.newAssignment = {
      name: value.name,
      description: value.desc,
      due: value.due,
      cohort: value.cohort
    };
    console.log('new assign ', this.newAssignment)
    const cohortKey = value.cohort
    if (this.editMode) {
      this.assignmentService.updateAssignment(this.editedItemIndex, this.newAssignment);
      console.log('new assignment ', this.newAssignment)
      this.onUpdateData(cohortKey, this.newAssignment);
    } else {
      this.assignmentService.addAssignment(this.newAssignment);
      this.onSaveData(cohortKey, this.newAssignment);
    }
    this.editMode = false;
    form.reset();
  }

  onSaveData(cohortKey, newAssignment) {
    this.dataStorageService.storeAssignmentData(cohortKey, this.newAssignment)
    // this.assignmentService.clearAssignments();
  }

  onUpdateData(cohortKey, newAssignment) {
    this.assignmentKey = this.assignmentKey.assignmentKey
    console.log( ' newwer assignment ', newAssignment)
    this.dataStorageService.updateAssignmentData(cohortKey, newAssignment, this.assignmentKey)
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
