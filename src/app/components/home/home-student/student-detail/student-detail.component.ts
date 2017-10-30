import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'
import { Student } from '../../../../models/student.model';
import { StudentService } from '../../../../services/student.service';
import { AuthService } from '../../../../auth/auth.service';
import { CohortService } from '../../../../services/cohort.service';
import { DataStorageService } from '../../../../services/data-storage.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  studentAssignment: any;
  student: Student = {
    fname: '',
    lname: '',
    email: '',
    cohort: '',
    uid: '',
    studentAssignments: {}
  };
  uid
  studentKey
  cohorts
  cohort
  cohortKey
  assignmentKey
  studentAssignments
  
  students: Student[];

  private subscription: Subscription;
  private cohortSubscription: Subscription;

  constructor(private studentService: StudentService, private authService: AuthService, private cohortService: CohortService, private dataStorageService: DataStorageService) { }

   async ngOnInit() {
    this.students = this.studentService.getStudents();
    this.uid = this.authService.getUID();
    this.subscription = this.studentService.studentsChanged.subscribe(
      (students: Student[]) => {
        this.students = students;
      }
    );
     await this.studentService.oneStudent.subscribe((data) => {
      this.student = data;
      this.studentAssignments = this.student.studentAssignments; 
      console.log('this.studentassignments', this.student);
      this.cohorts = this.cohortService.getCohorts2()
      for (let ourCohort of this.cohorts) {
        if (ourCohort.key == this.student.cohort) {
          this.cohort = ourCohort;
        }
      }
     });
     this.cohortKey = this.student.cohort;
  }
}
