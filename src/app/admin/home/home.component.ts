import { Component, OnInit } from '@angular/core';
import { Assignment } from '../../shared/assignment.model';
import { HomeService } from './home.service';
import { CreateAssignmentService } from '../create-assignment/create-assignment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  selectedAssignment: Assignment;

  constructor(private createAssignmentService: CreateAssignmentService) { }

  ngOnInit() {
    this.createAssignmentService.assignmentSelected.subscribe(
      (assignment: Assignment) => {
        this.selectedAssignment = assignment;
      }
    );
  }

}
