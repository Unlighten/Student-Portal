import { Component, OnInit, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Student } from '../../../models/student.model';
import { Cohort } from '../../../models/cohort.model';
import { StudentService } from '../../../services/student.service';
import { CohortService } from '../../../services/cohort.service';
import { DataStorageService } from '../../../services/data-storage.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  @Input() student: Student;
  @Output() studentSelected = new Subject<void>();
  private cohortSubscription: Subscription;
  public someSubscription: Subscription;
  cohort
  cohorts
  morecohorts

  students: Array<any> //Links to home.model and reminds Angular Student is an array
  private subscription: Subscription;

  constructor(private dataStorageService: DataStorageService, private studentService: StudentService, public cohortService: CohortService) { }

  async ngOnInit() {
    this.cohorts = await this.dataStorageService.getData();
     //OnInit, Angular sets up student array
    this.subscription = this.studentService.studentsChanged.subscribe(
      (students: Student[]) => {
        this.students = students;
        // console.log("should be here",students)
      }
    );

    this.someSubscription = this.cohortService.setRenew$.subscribe(
      (res) => {
        this.getMoreData()
      }
    )

    this.cohortSubscription = this.cohortService.cohortChanged.subscribe(
      (cohort: Cohort) => {
        this.cohort = cohort;
        this.students = this.studentService.getStudents();
        console.log('this cohort ', this.cohort)   
        this.changeStudents()     
        // if (!this.cohort.info.students){
        //   this.cohorts = [];
        // } else {
        //   this.changeStudents()      
        // }
      }
    )
    this.changeStudents()          
  }

  async getMoreData() {
    this.cohorts = await this.dataStorageService.getData(); 
    this.changeStudents()         
  }

  onSelected() {
    this.studentService.studentSelected.next(this.student);
  }

  changeStudents() {
    for (let aCohort of this.cohorts) {
      if (aCohort.key == this.cohort) {
        if (aCohort.info.students){
        console.log('here agha ', aCohort.info)
        this.students = Object.values(aCohort.info.students)
        this.studentService.setStudentData(this.students)
        console.log('this students ', this.students)
        } else {
          console.log('else ')
          this.students = [];
        }
      }
    }
  }

  async renewData() {
    this.cohorts = await this.dataStorageService.getData()
  }

  bindElementToStudent(data) { //Prevents errors when clicking (for assignment modal) the links within assignment-list
    if (data.target.id) { //prevents errors when hitting the links directly
      this.studentService.getStudentById(data.target.id);
    } else if (data.target.parentElement.parentElement.id) { //prevents errors within the modal itself
      this.studentService.getStudentById(data.target.parentElement.parentElement.id)
      console.log(data)
    } else {
      this.studentService.getStudentById(data.target.parentElement.parentElement.parentElement.id)
    }
  }

  onEditItem(index: number) {
    this.studentService.startedEditing.next(index);
  }

  ngOnDestroy() { //When subscription is not detected, automatically disables CRUD ability on data
    this.subscription.unsubscribe();
  }
}
