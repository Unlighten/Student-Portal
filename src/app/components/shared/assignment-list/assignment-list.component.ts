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
  cohort
  cohorts
  
  constructor(private assignmentService: AssignmentService, private cohortService: CohortService, private dataStorageService: DataStorageService) { }

  async ngOnInit() { //Infills Assignment[] with FB data
    // this.assignments = this.assignmentService.getAssignments();
    this.cohorts = await this.dataStorageService.getData()
    // this.cohort = this.addCohortService.releaseCohortFilter();
    
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
    console.log('this assignments winner', this.assignments)          
  }

  onSelected() { //When clicked, infills edit input bars for edit functionality
    this.assignmentService.assignmentSelected.next(this.assignment);
  }

  changeAssignments() {
    console.log(this.cohorts, ' ass list test')
    // console.log('this cohort ass ', this.cohort.key)
    // let banana = this.cohort.propertyName
    //-KwuiSXI-2DXInd6idGJ
    for (let aCohort of this.cohorts) {
        if (aCohort.key == this.cohort) {
          console.log('here ', aCohort.info.assignments)
          this.assignments = Object.values(aCohort.info.assignments)
          this.assignmentService.setAssignmentData(this.assignments)
      }
    }
    // for(let assignment of this.assignments) {
    //   console.log('test', assignment.name)
    // }
      console.log('this assignments', this.assignments)
  }

  bindElementToAssignment(data) { //Prevents errors when clicking (for assignment modal) the links within assignment-list
    // console.log(this.createAssignmentService)
    console.log('data ', data)
    if (data.target.id) { //prevents errors when hitting the links directly
      console.log('data.target.id ', data.target.id)
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