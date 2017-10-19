import { Component, OnInit, Input, Output } from '@angular/core';
import { Assignment } from '../assignment.model';
import { CreateAssignmentService } from '../../admin/create-assignment/create-assignment.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Cohort } from '../../admin/add-cohort/cohort.model';
import { AddCohortService } from '../../admin/add-cohort/add-cohort.service';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css']
})
export class AssignmentListComponent implements OnInit {
  assignmentsByCohort: Assignment[];
  @Input() assignment: Assignment;
  @Output() assignmentSelected = new Subject<void>();

  assignments: Assignment[];
  private subscription: Subscription;
  private cohortSubscription: Subscription;
  cohort: Cohort;
  
  constructor(private createAssignmentService: CreateAssignmentService, private addCohortService: AddCohortService) { }

  ngOnInit() { //Infills Assignment[] with FB data
    this.assignments = this.createAssignmentService.getAssignments();
    // this.cohort = this.addCohortService.releaseCohortFilter();
    console.log(this.cohort, ' ass list test')
    
    this.subscription = this.createAssignmentService.assignmentsChanged.subscribe(
      (assignments: Assignment[]) => {
        this.assignments = assignments;
        console.log(assignments)
      }
    );
    this.cohortSubscription = this.addCohortService.cohortChanged.subscribe(
      (cohort: Cohort) => {
        this.cohort = cohort;
        this.assignments = this.createAssignmentService.getAssignments();        
        this.changeAssignments()      
      }
    )
    this.changeAssignments()          
  }

  onSelected() { //When clicked, infills edit input bars for edit functionality
    this.createAssignmentService.assignmentSelected.next(this.assignment);
  }

  changeAssignments() {
    this.assignments = this.assignments.filter(
      assignment => assignment.cohort.toString() === this.cohort.toString());
  }

  bindElementToAssignment(data) { //Prevents errors when clicking (for assignment modal) the links within assignment-list
    // console.log(this.createAssignmentService)
    if (data.target.id) { //prevents errors when hitting the links directly
      this.createAssignmentService.getAssignmentById(data.target.id);
    } else { //prevents errors within the modal itself
      this.createAssignmentService.getAssignmentById(data.target.parentElement.parentElement.id)
    }
  }

  onEditItem(index: number) { //Allows editability and puts at end of existing list
    this.createAssignmentService.startedEditing.next(index);
  }

  ngOnDestroy() { //When subscription is not detected, automatically disables CRUD ability on data
    this.subscription.unsubscribe();
  }
}