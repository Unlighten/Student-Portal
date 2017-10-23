import { Component, OnInit, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Assignment } from '../../../models/assignment.model';
import { Cohort } from '../../../models/cohort.model';
import { AssignmentService } from '../../../services/assignment.service';
import { CohortService } from '../../../services/cohort.service';

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
  
  constructor(private assignmentService: AssignmentService, private cohortService: CohortService) { }

  ngOnInit() { //Infills Assignment[] with FB data
    this.assignments = this.assignmentService.getAssignments();
    // this.cohort = this.addCohortService.releaseCohortFilter();
    console.log(this.cohort, ' ass list test')
    
    this.subscription = this.assignmentService.assignmentsChanged.subscribe(
      (assignments: Assignment[]) => {
        this.assignments = assignments;
        console.log(assignments)
      }
    );
    this.cohortSubscription = this.cohortService.cohortChanged.subscribe(
      (cohort: Cohort) => {
        this.cohort = cohort;
        this.assignments = this.assignmentService.getAssignments();        
        this.changeAssignments()      
      }
    )
    this.changeAssignments()          
  }

  onSelected() { //When clicked, infills edit input bars for edit functionality
    this.assignmentService.assignmentSelected.next(this.assignment);
  }

  changeAssignments() {
    console.log(this.cohort)
    this.assignments = this.assignments.filter(
      assignment => assignment.cohort.toString() === this.cohort.toString());
  }

  bindElementToAssignment(data) { //Prevents errors when clicking (for assignment modal) the links within assignment-list
    // console.log(this.createAssignmentService)
    if (data.target.id) { //prevents errors when hitting the links directly
      this.assignmentService.getAssignmentById(data.target.id);
    } else { //prevents errors within the modal itself
      this.assignmentService.getAssignmentById(data.target.parentElement.parentElement.id)
      console.log(data)
    }
  }

  onEditItem(index: number) { //Allows editability and puts at end of existing list
    this.assignmentService.startedEditing.next(index);
  }

  ngOnDestroy() { //When subscription is not detected, automatically disables CRUD ability on data
    this.subscription.unsubscribe();
  }
}