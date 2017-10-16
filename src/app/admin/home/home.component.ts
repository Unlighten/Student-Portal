import { Component, OnInit } from '@angular/core';
import { Assignment } from '../../shared/assignment.model';
import { HomeService } from './home.service';
import { CreateAssignmentService } from '../create-assignment/create-assignment.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  selectedAssignment: Assignment; 

  constructor(private createAssignmentService: CreateAssignmentService, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.createAssignmentService.assignmentSelected.subscribe(
      (assignment: Assignment) => {
        this.selectedAssignment = assignment;
      } //OnInit, Angular sets up looking for assignments array
    );
    this.onFetchData(); //Also fetches assignments from FB
  }

  onFetchData() {
    this.dataStorageService.getData(); //Attn. data-storage.service.ts
  }

}
