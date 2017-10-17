import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../shared/student.service'
import { Student } from '../../../shared/student.model'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  students: Student[];
  private subscription: Subscription;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.students = this.studentService.getStudents();
    this.subscription = this.studentService.studentsChanged.subscribe(
      (students: Student[]) => {
        this.students = students;
      }
    )
  }

}
