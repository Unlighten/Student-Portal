import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { CreateAssignmentService } from "../admin/create-assignment/create-assignment.service";
import { AuthService } from "../auth/auth.service";
import { Assignment } from "./assignment.model";

@Injectable()
export class DataStorageService {
  constructor(
    private http: Http, 
    private createAssignmentService: CreateAssignmentService,
    private authService: AuthService
  ) {}

  storeData() {
    return this.http.put('https://student-portal-4e814.firebaseio.com/assignments.json', this.createAssignmentService.getAssignments());
  }

  getData() {
    this.http.get('https://student-portal-4e814.firebaseio.com/assignments.json')
    .subscribe(
      (response: Response) => {
        const assignments: Assignment[] = response.json();
        this.createAssignmentService.setData(assignments);
      }
    );
  }
}