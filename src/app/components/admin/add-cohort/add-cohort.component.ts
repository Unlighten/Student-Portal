import { Component, OnInit, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Cohort } from '../../../models/cohort.model';
import { DataStorageService } from '../../../services/data-storage.service';
import { CohortService } from '../../../services/cohort.service';
import { Subject } from 'rxjs/Subject';

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
  @Input() cohort: Cohort;
  @Output() cohortSelected = new Subject<void>();
  newCohorts: '';
  cohorts: Array<any>;
  
  constructor(private dataStorageService: DataStorageService, private cohortService: CohortService) { }

  ngOnInit() {
    // this.cohorts = this.cohortService.getCohorts();
    // this.subscription = this.cohortService.cohortsChanged.subscribe(
    //   (cohorts: Cohort[]) => {
    //     this.cohorts = cohorts;
    //     this.cohorts = this.cohortService.getCohorts();
    //   }
    // )
    // this.cohorts = <any>this.onFetchData();
    this.cohorts = this.dataStorageService.getData()
    console.log('Changing to <any>', this.cohorts) 
    // console.log(newCohorts)
  }
  ngAfterViewInit() {
    console.log('Oke does this really work?', this.cohorts)
  }
  onSelected() {
    this.cohortService.cohortSelected.next(this.cohort)
  }

  onEditItem(index: number) {
    this.cohortService.startedEditing.next(index);
  }

  onSubmit(form: NgForm) {
    const newCohort = form.value.cohortName;
    this.cohortService.addCohort(newCohort)
    this.onSaveData(newCohort)
    form.reset();
  }

  onSaveData(newCohort) {
    this.dataStorageService.storeCohortData(newCohort)
    // .subscribe(
    //   (response: Response) => {
    //   }
    // )
  }

  async onFetchData() {
    let cohortArray = await <any>this.dataStorageService.getData()
    return cohortArray; //Attn. data-storage.service.ts
  }
}
