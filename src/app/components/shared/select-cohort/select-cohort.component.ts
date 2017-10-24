import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Cohort } from '../../../models/cohort.model';
import { CohortService } from '../../../services/cohort.service';
import { Subscription } from 'rxjs/Subscription';
import { DataStorageService } from '../../../services/data-storage.service';

// interface Cohort {
//   cohortName: string;
// }

@Component({
  selector: 'app-select-cohort',
  templateUrl: './select-cohort.component.html',
  styleUrls: ['./select-cohort.component.css']
})
export class SelectCohortComponent implements OnInit {
  // @Input() cohorts: Observable<Cohort[]>;
  subscription: Subscription;
  cohorts
  // cohortsArrayTwo: this.createArray;

  @Output('selectedCohortChange')
  // public cohort22: array = []];
  cohort: '';

  public constructor(private cohortService: CohortService, private dataStorageService: DataStorageService) {
    // this.addCohortService.setCohortFilter(this.data)
   }

  async ngOnInit() {
    // this.cohorts = this.cohortService.getCohorts();
    if (this.cohorts) {
      this.cohorts = this.cohorts
    } else {
      this.cohorts = await this.dataStorageService.getData();
      this.cohortService.setCohortData(this.cohorts)      
    }
    this.subscription = this.cohortService.cohortsChanged.subscribe(
      (cohorts) => {
        this.cohorts = cohorts;
        // this.cohorts = this.cohortService.getCohorts();
        console.log('this cohorts 12', this.cohorts)
      }
    )
    console.log('checker 1', this.cohorts)
  }

  createArray(){
    var cohortsArray = [];
    for(let cohort in this.cohorts){
      var newObject = {
        key: cohort,
        cohortName: this.cohorts[cohort].cohortName
      }
      cohortsArray.push(newObject)
    }
    console.log('cohorts 11 ', cohortsArray)
    return cohortsArray
  }

  sendCohortFilter(cohort) {
    this.cohort = cohort
    console.log('2 22222 ', cohort)
    console.log('super serious test ', JSON.stringify(this.cohort))
    this.cohortService.setCohortFilter(this.cohort)
  }

}
