import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { CreateAssignmentService } from "../admin/create-assignment/create-assignment.service";
import { AuthService } from "../auth/auth.service";
import { Assignment } from "./assignment.model";
import { StudentService } from "./student.service";
import { Student } from "./student.model";
import { AddCohortService } from "../admin/add-cohort/add-cohort.service";
import { Cohort } from "../admin/add-cohort/cohort.model";

@Injectable()
export class DataStorageService {
  constructor(
    private http: Http, 
    private createAssignmentService: CreateAssignmentService,
    private authService: AuthService,
    private homeService: StudentService,
    private addCohortService: AddCohortService,
    private studentService: StudentService
  ) {}

  storeAssignmentData() { //stores data via preset criteria (name, description, due)
    return this.http.put('https://student-portal-4e814.firebaseio.com/assignments.json', this.createAssignmentService.getAssignments()); 
  }

  storeStudentData() {
    return this.http.put('https://student-portal-4e814.firebaseio.com/users.json', this.studentService.getStudents()); 
  }

  getData() { //getData was not an automatic feature for Angular => creates path to fetch data and replace existing data (allows add/update/delete without duplicates)
    this.http.get('https://student-portal-4e814.firebaseio.com/assignments.json')
    .subscribe( //since .subscribe is here, no need for each instance of getData
      (response: Response) => {
        const assignments: Assignment[] = response.json(); //json readable by Angular
        this.createAssignmentService.setAssignmentData(assignments); //looks to infill where criteria fits Assignment[]
      }
    );

    this.http.get('https://student-portal-4e814.firebaseio.com/users.json')
    .subscribe(
      (response: Response) => {
        const students: Student[] = response.json();
        this.studentService.setStudentData(students);
      }
    );

    this.http.get('https://student-portal-4e814.firebaseio.com/cohorts.json')
    .subscribe( //since .subscribe is here, no need for each instance of getData
      (response: Response) => {
        const cohorts: Cohort[] = response.json(); //json readable by Angular
        this.addCohortService.setCohortData(cohorts); //looks to infill where criteria fits Assignment[]
      }
    );
  }

  storeCohortData() {
    return this.http.put('https://student-portal-4e814.firebaseio.com/cohorts.json', this.addCohortService.getCohorts());     
  }
}