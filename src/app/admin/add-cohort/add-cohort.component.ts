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

  cohorts: Cohort[];

  constructor(private dataStorageService: DataStorageService, private addCohortService: AddCohortService) { }

  ngOnInit() {
    this.cohorts = this.addCohortService.getCohorts();
    this.subscription = this.addCohortService.cohortsChanged.subscribe(
      (cohorts: Cohort[]) => {
        this.cohorts = cohorts;
      }
    )
    this.onFetchData();

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
      }
    )
  }

  onFetchData() {
    this.dataStorageService.getData(); //Attn. data-storage.service.ts
  }
}
