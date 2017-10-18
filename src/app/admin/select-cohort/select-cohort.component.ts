import { Component, OnInit } from '@angular/core';
import { Cohort } from '../add-cohort/cohort.model';
import { AddCohortService } from '../add-cohort/add-cohort.service'

@Component({
  selector: 'app-select-cohort',
  templateUrl: './select-cohort.component.html',
  styleUrls: ['./select-cohort.component.css']
})
export class SelectCohortComponent implements OnInit {
  cohorts: Cohort[];
  
  constructor(private addCohortService: AddCohortService) { }

  ngOnInit() {
    this.cohorts = this.addCohortService.getCohorts();
    console.log('select cohort ', this.cohorts)
  }

}
