import { Subject } from "rxjs/Subject";
import { Cohort } from "./cohort.model";
import { Observable } from "rxjs/Observable";

export class AddCohortService {
    cohortSelected = new Subject<Cohort>();
    cohortChanged = new Subject<Cohort>();
    cohortsChanged = new Subject<Cohort[]>();
    
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

    getCohorts() { //Pulls in data to infill Assignment[]
        return this.cohorts.slice();
    }

    setCohortFilter(cohort) {
        console.log('testers ', cohort)
        this.cohort = cohort;
        this.cohortChanged.next(cohort);
        // return cohort
    }
}