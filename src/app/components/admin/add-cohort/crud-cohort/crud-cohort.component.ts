import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Cohort } from '../../../../models/cohort.model';
import { CohortService } from '../../../../services/cohort.service';
import { DataStorageService } from '../../../../services/data-storage.service';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http';

@Component({
  selector: 'app-crud-cohort',
  templateUrl: './crud-cohort.component.html',
  styleUrls: ['./crud-cohort.component.css']
})
export class CrudCohortComponent implements OnInit, OnDestroy {
  @ViewChild('f') createCohortForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Cohort;

  constructor(private cohortService: CohortService, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.subscription = this.cohortService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.cohortService.getCohort(index);
        this.createCohortForm.setValue({
          cohortName: this.editedItem.cohortName
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newCohort = new Cohort(value.cohortName);
    if (this.editMode) {
      this.cohortService.updateCohort(this.editedItemIndex, newCohort);
      this.onSaveData();
    }
    this.editMode = false;
    form.reset();
  }

  onSaveData() {
    this.dataStorageService.storeCohortData()
      .subscribe(
        (response: Response) => {}
      );
  }

  onClear() {
    this.createCohortForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.cohortService.deleteCohort(this.editedItemIndex);
    this.onClear();
    this.onSaveData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
