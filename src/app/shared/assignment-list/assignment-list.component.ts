import { Component, OnInit, Injectable, Input, Output } from '@angular/core';
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

  ngOnInit() {
    this.assignments = this.createAssignmentService.getAssignments();
    this.subscription = this.createAssignmentService.assignmentsChanged.subscribe(
      (assignments: Assignment[]) => {
        this.assignments = assignments;
        console.log(assignments)
      }
    )
  }

  onSelected() {
    this.createAssignmentService.assignmentSelected.next(this.assignment);
  }

  onEditItem(index: number) {
    this.createAssignmentService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}