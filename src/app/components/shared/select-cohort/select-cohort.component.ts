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
  @Output('selectedCohortChange')
  public data: string = 'test again';
  cohort: '';

  public constructor(private cohortService: CohortService) {
    // this.addCohortService.setCohortFilter(this.data)
   }

  ngOnInit() {
    this.cohorts = this.cohortService.getCohorts();
  }

  sendCohortFilter(cohort) {
    this.cohort = cohort
    console.log('super serious test ', cohort)
    this.cohortService.setCohortFilter(cohort)
  }

}
