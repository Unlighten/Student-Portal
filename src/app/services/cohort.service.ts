import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { Cohort } from "../models/cohort.model";

export class CohortService {
    cohortSelected = new Subject<Cohort>();
    cohortChanged = new Subject<Cohort>();
    cohortsChanged = new Subject<Cohort[]>();
    startedEditing = new Subject<number>();
    
    public setCohortFilterSubject = new Subject<Cohort>();
    setCohortFilter$: Observable<Cohort>;
    cohort: Cohort;

    constructor() {
      this.setCohortFilter$ = this.setCohortFilterSubject.asObservable()
    }
    public cohorts: Cohort[] = [];

    setCohortData(cohorts: Cohort[]) {
      this.cohorts = cohorts;
      console.log(' i give up ', this.cohorts)
      if (this.cohorts) {this.cohortsChanged.next(this.cohorts.slice())};
    }
        
    addCohort(cohort: Cohort) {
        console.log('this cohorts ', this.cohorts)
        this.cohorts = this.cohorts || []  
      this.cohorts.push(cohort);
      if (this.cohorts) {
      this.cohortsChanged.next(this.cohorts.slice())};        
    }

    updateCohort(index: number, newCohort: Cohort) {
      this.cohorts[index] = newCohort;
      this.cohortsChanged.next(this.cohorts.slice());
    }

    deleteCohort(index: number) {
      this.cohorts.splice(index, 1);
      this.cohortsChanged.next(this.cohorts.slice());
    }

    getCohorts() { //Pulls in data to infill Assignment[]
        console.log(this.cohorts)
      if (this.cohorts) {return this.cohorts.slice()};
    }

    getCohort(index: number) {
      return this.cohorts[index];
    }

    setCohortFilter(cohort) {
      console.log('testers ', cohort)
      this.cohort = cohort;
      this.cohortChanged.next(cohort);
      // return cohort
    }
}