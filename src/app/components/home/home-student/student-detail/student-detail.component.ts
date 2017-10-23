import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'
import { Student } from '../../../../models/student.model';
import { StudentService } from '../../../../services/student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  student: Student = {
    fname: '',
    lname: '',
    email: '',
    cohort: ''
  };
  students: Student[];
  private subscription: Subscription;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.students = this.studentService.getStudents();
    this.subscription = this.studentService.studentsChanged.subscribe(
      (students: Student[]) => {
        this.students = students;
      }
    );
    this.studentService.oneStudent.subscribe(data => this.student = data);
  }
}
