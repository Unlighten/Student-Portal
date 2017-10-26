import { Component, OnInit, OnDestroy, ViewChild, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Cohort } from '../../../../models/cohort.model';
import { CohortService } from '../../../../services/cohort.service';
import { DataStorageService } from '../../../../services/data-storage.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-crud-cohort',
  templateUrl: './crud-cohort.component.html',
  styleUrls: ['./crud-cohort.component.css']
})
export class CrudCohortComponent implements OnInit, OnDestroy {
  // cohorts: any;
  @Input() cohorts
  @Output() newCohorts
  @ViewChild('f') createCohortForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Cohort;
  cohortKey
  newCohort

  constructor(private cohortService: CohortService, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.subscription = this.cohortService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.cohortService.getCohort(index);
        this.cohortKey = this.cohortService.getCohort(index);
        console.log('cohort key ', this.cohortKey.cohortKey);
        // this.createCohortForm.setValue({
        //   cohortName: this.editedItem.cohortName
        // });
        console.log("OVER HERE", this.createCohortForm)
      }
    );
  }

  async onSubmit(form: NgForm) {
    const newCohort = form.value
    // const newCohort = new Cohort(value.cohortName);
    this.cohortService.addCohort(newCohort);
    this.onSaveData(newCohort);

    this.editMode = false;
    this.newCohorts = await this.dataStorageService.getData()
    // console.log('this cohorts crud ', this.newCohorts)
    form.reset();
    this.cohortService.getCohorts(this.newCohorts);
  }

  onSaveData(newCohort) {
    this.dataStorageService.storeCohortData(newCohort)
      // .subscribe(
      //   (response: Response) => {}
      // );
  }

  onClear() {
    this.createCohortForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.cohortKey = this.cohortKey.cohortKey;
    this.cohortService.deleteCohort(this.editedItemIndex);
    this.onClear();
    this.dataStorageService.deleteCohortData(this.cohortKey);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
