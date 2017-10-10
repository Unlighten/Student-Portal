import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { CreateAssignmentService } from "../admin/create-assignment/create-assignment.service";

@Injectable()
export class DataStorageService {
  constructor(private http: Http, private createAssignmentService: CreateAssignmentService) {}

  storeData() {
    return this.http.put('https://student-portal-4e814.firebaseio.com/assignments.json', this.createAssignmentService.getAssignments());
  }
}