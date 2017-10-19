import { Component, OnInit, Input, Output } from '@angular/core';
import { Cohort } from '../add-cohort/cohort.model';
import { AddCohortService } from '../add-cohort/add-cohort.service'
import { Observable } from 'rxjs/Observable';

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
  @Output('selectedCohortChange')
  public data: string = 'test again';
  cohort: '';

  public constructor(private addCohortService: AddCohortService) {
    // this.addCohortService.setCohortFilter(this.data)
   }

  ngOnInit() {
    this.cohorts = this.addCohortService.getCohorts();
  }

  sendCohortFilter(cohort) {
    this.cohort = cohort
    console.log('super serious test ', cohort)
    this.addCohortService.setCohortFilter(cohort)
  }

}
