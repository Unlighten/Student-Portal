import { Component, OnInit, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Cohort } from '../../../models/cohort.model';
import { DataStorageService } from '../../../services/data-storage.service';
import { CohortService } from '../../../services/cohort.service';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';

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
  @Input() newCohorts
  @Output() cohortSelected = new Subject<void>();
  cohorts
  
  constructor(private dataStorageService: DataStorageService, private cohortService: CohortService) { }

  async ngOnInit() {
    if (this.newCohorts) {
      this.cohorts = this.newCohorts
    } else {
      this.cohorts = await this.dataStorageService.getData();
      this.cohortService.setCohortData(this.cohorts)      
    }
    this.subscription = this.cohortService.cohortsChanged.subscribe(
      (cohorts) => {
        this.cohorts = cohorts;
        // this.cohorts = this.cohortService.getCohorts();
        // console.log('this cohorts', this.cohorts)
      }
    )
    // console.log('Changing to <any>', this.cohorts) 
    // console.log(' this ', this.cohorts)
    }
  
  ngAfterViewInit() {
    // this.onFetchData()
    // console.log('Oke does this really work?', this.cohorts)
  }
  onSelected() {
    this.cohortService.cohortSelected.next(this.cohort)
  }

  onEditItem(index: number) {
    console.log('add cohort test ', index)
    this.cohortService.startedEditing.next(index);
  }

  onSaveData(newCohort) {
    this.dataStorageService.storeCohortData(newCohort)
    // this.onFetchData()
    // .subscribe(
    //   (response: Response) => {
    //   }
    // )
  }

  onFetchData() {
    let cohortArray = this.dataStorageService.getData()
    // console.log('cohort array ', cohortArray)
    // console.log('anything', this.cohorts)
    // return this.cohorts
    // return cohortArray; //Attn. data-storage.service.ts
  }
}
