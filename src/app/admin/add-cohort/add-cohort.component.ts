import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from '../../shared/data-storage.service';
import { Response } from '@angular/http';
import { AddCohortService } from './add-cohort.service'
import { Subscription } from 'rxjs/Subscription';
import { Cohort } from "./cohort.model";

@Component({
  selector: 'app-add-cohort',
  templateUrl: './add-cohort.component.html',
  styleUrls: ['./add-cohort.component.css']
})
export class AddCohortComponent implements OnInit {
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Cohort;

  constructor(private dataStorageService: DataStorageService, private addCohortService: AddCohortService) { }

  ngOnInit() {
    // this.subscription = this.createAssignmentService.startedEditing.subscribe(
    //   (index: number) => {
    //     this.editedItemIndex = index;
    //     this.editMode = true;
    //     this.editedItem = this.createAssignmentService.getAssignment(index);
    //     this.createAssignmentForm.setValue({
    //       name: this.editedItem.name,
    //       desc: this.editedItem.description,
    //       due: this.editedItem.due
    //     })
    //   }
    // );
  }

  onSubmit(form: NgForm) {
    const newCohort = form.value.cohortName;
    this.addCohortService.addCohort(newCohort)
    this.onSaveData()
    form.reset();
  }

  onSaveData() {
    this.dataStorageService.storeCohortData().subscribe(
      (response: Response) => {
        console.log(response)
      }
    )
  }
}
