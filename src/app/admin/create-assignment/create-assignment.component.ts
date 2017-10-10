import { Component, OnInit } from '@angular/core';
import { Assignment } from '../../shared/assignment.model';
import { CreateAssignmentService } from './create-assignment.service';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.css']
})
export class CreateAssignmentComponent implements OnInit {
  assignments: Assignment[];

  constructor(private createAssignmentService: CreateAssignmentService) { }

  ngOnInit() {
    this.assignments = this.createAssignmentService.getAssignments();
    this.createAssignmentService.assignmentsChanged.subscribe(
      (assignments: Assignment[]) => {
        this.assignments = assignments;
      }
    )
  }

}
