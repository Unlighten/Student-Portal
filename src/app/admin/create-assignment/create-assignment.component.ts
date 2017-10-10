import { Component, OnInit, OnDestroy } from '@angular/core';
import { Assignment } from '../../shared/assignment.model';
import { CreateAssignmentService } from './create-assignment.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.css']
})
export class CreateAssignmentComponent implements OnInit, OnDestroy {
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
  }

  onEditItem(index: number) {
    this.createAssignmentService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
