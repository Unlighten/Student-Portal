import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { Cohort } from "../models/cohort.model";
import { DataStorageService } from "./data-storage.service";
import { Input } from "@angular/core";
// import { DataStorageService } from "./data-storage.service";
// import { AllCohorts } from "../models/allCohorts.model";

export class CohortService {
    cohortSelected = new Subject<Cohort>();
    cohortChanged = new Subject<any>();
    cohortsChanged = new Subject<Cohort[]>();
    startedEditing = new Subject<number>();
    ourCohorts = new Subject<any>();
    @Input() newCohorts = new Subject<any>();
    public renew = new Subject<any>();

    public setCohortFilterSubject = new Subject<Cohort>();
    setCohortFilter$: Observable<Cohort>;
    setRenew$: Observable<any>
    cohort: Cohort;
    public cohorts: Array<any>;

    public renewCohortData() {
      this.renew.next()
    }
    constructor() {
      this.setCohortFilter$ = this.setCohortFilterSubject.asObservable()
      this.setRenew$ = this.renew.asObservable()
    }

    
    setCohortData(cohorts: Cohort[]) {
      this.cohorts = cohorts;
      console.log(' i give up ', this.cohorts)
      if (this.cohorts) {this.cohortsChanged.next(this.cohorts)};
    }

    addCohort(cohort: Cohort) {
        console.log('this cohorts ')
        // this.cohorts = this.dataStorageService.getData()
      if (this.cohorts) {
      this.cohortsChanged.next(this.cohorts)};  
      console.log('somewhere else ', this.cohorts)      
    }

    updateCohort(index: number, newCohort: Cohort) {
      this.cohorts[index] = newCohort;
      this.cohortsChanged.next(this.cohorts);
    }

    deleteCohort(index: number) {
      this.cohorts.splice(index, 1);
      this.cohortsChanged.next(this.cohorts);
    }

    getCohorts(newCohorts) { //Pulls in data to infill Assignment[]
    //     console.log(this.cohorts)
    //   if (this.cohorts) {return this.cohorts};
        this.cohorts = newCohorts
        console.log('new cohorts ', this.cohorts)
        this.cohortsChanged.next(this.cohorts);
    }

    getCohorts2() {
      return this.cohorts
    }

    receiveCohorts() {
      return this.cohorts
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