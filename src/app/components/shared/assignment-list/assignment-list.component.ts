import { Component, OnInit, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Assignment } from '../../../models/assignment.model';
import { Cohort } from '../../../models/cohort.model';
import { AssignmentService } from '../../../services/assignment.service';
import { CohortService } from '../../../services/cohort.service';
import { DataStorageService } from '../../../services/data-storage.service';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css']
})
export class AssignmentListComponent implements OnInit {
  assignmentsByCohort: Assignment[];
  @Input() assignment: Assignment;
  // @Output() assignmentSelected = new Subject<void>();

  assignments: Array<any>
  private subscription: Subscription;
  private cohortSubscription: Subscription;
  private someSubscription: Subscription;
  
  cohort
  cohorts
  
  constructor(private assignmentService: AssignmentService, private cohortService: CohortService, private dataStorageService: DataStorageService) { }

  async ngOnInit() { //Infills Assignment[] with FB data
    this.cohorts = await this.dataStorageService.getData()
    
    this.subscription = this.assignmentService.assignmentsChanged.subscribe(
      (assignments: Assignment[]) => {
        this.assignments = assignments;
        console.log(assignments)
      }
    );

    this.someSubscription = this.cohortService.setRenew$.subscribe(
      (res) => {
        this.getMoreData()
      }
    )

    this.cohortSubscription = this.cohortService.cohortChanged.subscribe(
      (cohort: Cohort) => {
        if (cohort == 123456) {

        } else {
          this.cohort = cohort;
          this.assignments = this.assignmentService.getAssignments();        
          this.changeAssignments()  
        }    
      }
    )
  }

  onSelected() { //When clicked, infills edit input bars for edit functionality
    this.assignmentService.assignmentSelected.next(this.assignment);
  }

  async getMoreData() {
    this.cohorts = await this.dataStorageService.getData();
    this.changeAssignments()          
  }

  changeAssignments() {
    for (let aCohort of this.cohorts) {
      if (aCohort.key == this.cohort) {
        if (aCohort.info.assignments) {
        this.assignments = Object.values(aCohort.info.assignments)
        this.assignmentService.setAssignmentData(this.assignments)
        } else {
          this.assignments = []
        }
      }
    }
    // for(let assignment of this.assignments) {
    //   console.log('test', assignment.name)
    // }
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