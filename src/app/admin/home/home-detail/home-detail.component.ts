import { Component, OnInit } from '@angular/core';
import { Assignment } from '../../../shared/assignment.model';
import { CreateAssignmentService } from '../../create-assignment/create-assignment.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.css']
})
export class HomeDetailComponent implements OnInit {
  assignments: Assignment[];
  private subscription: Subscription;
  
  constructor(private createAssignmentService: CreateAssignmentService) { }

  ngOnInit() {
    this.assignments = this.createAssignmentService.getAssignments();
    this.subscription = this.createAssignmentService.assignmentsChanged.subscribe(
      (assignments: Assignment[]) => {
        this.assignments = assignments;
      }
    )
  };
}
