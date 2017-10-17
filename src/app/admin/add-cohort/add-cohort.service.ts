import { Subject } from "rxjs/Subject";
import { Cohort } from "./cohort.model";

export class AddCohortService {
    cohortSelected = new Subject<Cohort>();
    cohortsChanged = new Subject<Cohort[]>();
  
    private cohorts: Cohort[] = [];
    
    addCohort(cohort: Cohort) {
        this.cohorts.push(cohort);
        this.cohortsChanged.next(this.cohorts.slice());        
    }

    getCohorts() { //Pulls in data to infill Assignment[]
        return this.cohorts.slice();
    }
}