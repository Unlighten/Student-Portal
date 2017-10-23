import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Cohort } from '../../../models/cohort.model';
import { CohortService } from '../../../services/cohort.service';

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
  cohorts: Cohort[];
  // cohortsArrayTwo: this.createArray;

  @Output('selectedCohortChange')
  // public cohort22: array = []];
  cohort: '';

  public constructor(private cohortService: CohortService) {
    // this.addCohortService.setCohortFilter(this.data)
   }

  ngOnInit() {
    this.cohorts = this.cohortService.getCohorts();
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
    console.log(typeof(cohortsArray))
    return cohortsArray
  }

  sendCohortFilter(cohort) {
    this.cohort = cohort
    console.log('2 22222 ', cohort)
    console.log('super serious test ', JSON.stringify(this.cohort))
    this.cohortService.setCohortFilter(this.cohort)
  }

}
