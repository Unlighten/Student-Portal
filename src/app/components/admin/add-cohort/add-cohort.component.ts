import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Cohort } from '../../../models/cohort.model';
import { DataStorageService } from '../../../services/data-storage.service';
import { CohortService } from '../../../services/cohort.service';

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

  cohorts: Cohort[];

  constructor(private dataStorageService: DataStorageService, private cohortService: CohortService) { }

  ngOnInit() {
    this.cohorts = this.cohortService.getCohorts();
    this.subscription = this.cohortService.cohortsChanged.subscribe(
      (cohorts: Cohort[]) => {
        this.cohorts = cohorts;
      }
    )
    this.onFetchData();

  }

  onSubmit(form: NgForm) {
    const newCohort = form.value.cohortName;
    this.cohortService.addCohort(newCohort)
    this.onSaveData()
    form.reset();
  }

  onSaveData() {
    this.dataStorageService.storeCohortData().subscribe(
      (response: Response) => {
      }
    )
  }

  onFetchData() {
    this.dataStorageService.getData(); //Attn. data-storage.service.ts
  }
}
