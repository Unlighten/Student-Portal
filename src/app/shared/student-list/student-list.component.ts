import { Component, OnInit, Input, Output } from '@angular/core';
import { Student } from '../student.model';
import { Subscription } from 'rxjs/Subscription';
import { StudentService } from '../student.service';
import { Subject } from 'rxjs/Subject';
import { AddCohortService } from '../../admin/add-cohort/add-cohort.service';
import { Cohort } from '../../admin/add-cohort/cohort.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  @Input() student: Student;
  @Output() studentSelected = new Subject<void>();
  private cohortSubscription: Subscription;
  cohort: Cohort;

  students: Student[]; //Links to home.model and reminds Angular Student is an array
  private subscription: Subscription;

  constructor(private studentService: StudentService, private addCohortService: AddCohortService) { }

  ngOnInit() {
    this.students = this.studentService.getStudents(); //OnInit, Angular sets up student array
    this.subscription = this.studentService.studentsChanged.subscribe(
      (students: Student[]) => {
        this.students = students;
        // console.log("should be here",students)
      }
    );

    this.cohortSubscription = this.addCohortService.cohortChanged.subscribe(
      (cohort: Cohort) => {
        this.cohort = cohort;
        this.students = this.studentService.getStudents();        
        this.changeStudents()      
      }
    )
    this.changeStudents()          
  }

  onSelected() {
    this.studentService.studentSelected.next(this.student);
  }

  changeStudents() {
    this.students = this.students.filter(
      assignment => assignment.cohort.toString() === this.cohort.toString());
  }

  bindElementToStudent(data) { //Prevents errors when clicking (for assignment modal) the links within assignment-list
    if (data.target.id) { //prevents errors when hitting the links directly
      this.studentService.getStudentById(data.target.id);
    } else { //prevents errors within the modal itself
      this.studentService.getStudentById(data.target.parentElement.parentElement.id)
    }
  }

  onEditItem(index: number) {
    this.studentService.startedEditing.next(index);
  }

  ngOnDestroy() { //When subscription is not detected, automatically disables CRUD ability on data
    this.subscription.unsubscribe();
  }
}
