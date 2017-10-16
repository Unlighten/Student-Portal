import { Component, OnInit } from '@angular/core';
import { Assignment } from '../../../shared/assignment.model';
import { Subscription } from 'rxjs/Subscription';
import { CreateAssignmentService } from '../../../admin/create-assignment/create-assignment.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  assignments: Assignment[];
  private subscription: Subscription;
  
  constructor(private createAssignmentService: CreateAssignmentService) { }

  ngOnInit() { //Creates and infills assignments onInit
    this.assignments = this.createAssignmentService.getAssignments();
    this.subscription = this.createAssignmentService.assignmentsChanged.subscribe(
      (assignments: Assignment[]) => {
        this.assignments = assignments;
      }
    )
    console.log(this.assignments)
  }
}
