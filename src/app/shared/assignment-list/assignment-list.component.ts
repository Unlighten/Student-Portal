import { Component, OnInit, Input, Output } from '@angular/core';
import { Assignment } from '../assignment.model';
import { CreateAssignmentService } from '../../admin/create-assignment/create-assignment.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css']
})
export class AssignmentListComponent implements OnInit {
  @Input() assignment: Assignment;
  @Output() assignmentSelected = new Subject<void>();

  assignments: Assignment[];
  private subscription: Subscription;

  constructor(private createAssignmentService: CreateAssignmentService) { }

  ngOnInit() { //Infills Assignment[] with FB data
    this.assignments = this.createAssignmentService.getAssignments();
    this.subscription = this.createAssignmentService.assignmentsChanged.subscribe(
      (assignments: Assignment[]) => {
        this.assignments = assignments;
        // console.log(assignments)
      }
    )
  }

  onSelected() { //When clicked, infills edit input bars for edit functionality
    this.createAssignmentService.assignmentSelected.next(this.assignment);
  }

  onEditItem(index: number) { //Allows editability and puts at end of existing list
    this.createAssignmentService.startedEditing.next(index);
  }

  ngOnDestroy() { //When subscription is not detected, automatically disables CRUD ability on data
    this.subscription.unsubscribe();
  }
}