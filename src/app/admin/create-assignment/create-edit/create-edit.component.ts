import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Assignment } from '../../../shared/assignment.model';
import { CreateAssignmentService } from '../create-assignment.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { DataStorageService } from '../../../shared/data-storage.service';
import { Response } from '@angular/http';
import { Cohort } from '../../add-cohort/cohort.model';
import { AddCohortService } from '../../add-cohort/add-cohort.service';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css']
})
export class CreateEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') createAssignmentForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Assignment;
  cohorts: Cohort[]
  
  constructor(private createAssignmentService: CreateAssignmentService, private dataStorageService: DataStorageService, private addCohortService: AddCohortService) { }

  ngOnInit() {
    this.subscription = this.createAssignmentService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.createAssignmentService.getAssignment(index);
        this.createAssignmentForm.setValue({
          name: this.editedItem.name,
          desc: this.editedItem.description,
          due: this.editedItem.due,
          cohort: this.editedItem.cohort
        })
      }
    );
    this.cohorts = this.addCohortService.getCohorts();        
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newAssignment = new Assignment(value.name, value.desc, value.due, value.cohort);
    if (this.editMode) {
      this.createAssignmentService.updateAssignment(this.editedItemIndex, newAssignment);
      this.onSaveData();
    } else {
      this.createAssignmentService.addAssignment(newAssignment);
      this.onSaveData();
    }
    this.editMode = false;
    form.reset();
  }

  onSaveData() {
    this.dataStorageService.storeAssignmentData().subscribe(
      (response: Response) => {
      }
    );
    this.createAssignmentService.clearAssignments();
  }

  onClear() {
    this.createAssignmentForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.createAssignmentService.deleteAssignment(this.editedItemIndex);
    this.onClear();
    this.onSaveData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
