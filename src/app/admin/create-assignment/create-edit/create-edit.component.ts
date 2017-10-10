import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Assignment } from '../../../shared/assignment.model';
import { CreateAssignmentService } from '../create-assignment.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { DataStorageService } from '../../../shared/data-storage.service';
import { Response } from '@angular/http';

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

  constructor(private createAssignmentService: CreateAssignmentService, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.subscription = this.createAssignmentService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.createAssignmentService.getAssignment(index);
        this.createAssignmentForm.setValue({
          name: this.editedItem.name,
          desc: this.editedItem.description,
          due: this.editedItem.due
        })
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newAssignment = new Assignment(value.name, value.desc, value.due);
    if (this.editMode) {
      this.createAssignmentService.updateAssignment(this.editedItemIndex, newAssignment);
    } else {
      this.createAssignmentService.addAssignment(newAssignment);
    }
    this.editMode = false;
    form.reset();
  }

  onSaveData() {
    this.dataStorageService.storeData().subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }

  onClear() {
    this.createAssignmentForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.createAssignmentService.deleteAssignment(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
