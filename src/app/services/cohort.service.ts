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
      if (this.cohorts) {this.cohortsChanged.next(this.cohorts)};
    }
        
    addCohort(cohort: Cohort) {
        console.log('this cohorts ', this.cohorts)
        // this.cohorts = this.cohorts || []  
    //   this.cohorts.push(cohort);
      if (this.cohorts) {
      this.cohortsChanged.next(this.cohorts)};        
    }

    updateCohort(index: number, newCohort: Cohort) {
      this.cohorts[index] = newCohort;
      this.cohortsChanged.next(this.cohorts);
    }

    deleteCohort(index: number) {
      this.cohorts.splice(index, 1);
      this.cohortsChanged.next(this.cohorts);
    }

    getCohorts() { //Pulls in data to infill Assignment[]
    //     console.log(this.cohorts)
    //   if (this.cohorts) {return this.cohorts};
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