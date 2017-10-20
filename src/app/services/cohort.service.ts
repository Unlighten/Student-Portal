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
    private cohorts: Cohort[] = [];

    setCohortData(cohorts: Cohort[]) {
      this.cohorts = cohorts;
      this.cohortsChanged.next(this.cohorts.slice());
    }
        
    addCohort(cohort: Cohort) {
      this.cohorts.push(cohort);
      this.cohortsChanged.next(this.cohorts.slice());        
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
      return this.cohorts.slice();
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