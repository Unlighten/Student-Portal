import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'
import { Student } from '../../../../models/student.model';
import { StudentService } from '../../../../services/student.service';
import { AuthService } from '../../../../auth/auth.service';
import { CohortService } from '../../../../services/cohort.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  studentAssignments: any;
  student: Student = {
    fname: '',
    lname: '',
    email: '',
    cohort: '',
    // studentAssignments: {}
  };
  uid
  studentKey
  cohorts
  cohort
  cohortKey
  assignmentKey
  // studentAssignments
  students: Student[];

  private subscription: Subscription;
  private cohortSubscription: Subscription;

  constructor(private studentService: StudentService, private authService: AuthService, private cohortService: CohortService) { }

  async ngOnInit() {
    this.students = this.studentService.getStudents();
    // this.uid = this.authService.getUID();
    this.subscription = this.studentService.studentsChanged.subscribe(
      (students: Student[]) => {
        this.students = students;
      }
    );
    this.studentService.oneStudent.subscribe(data => this.student = data);
  }
}
