import { Component, OnInit } from '@angular/core';
import { Student } from '../home.model';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.component.html',
  styleUrls: ['./home-student.component.css']
})
export class HomeStudentComponent implements OnInit {
  students: Student[] = [
    new Student('Nathan Bogan'),
    new Student('Thomas McClellan'),
    new Student('Aaron Moore'),
    new Student('Maximilian Schwarzmüller')
  ]

  constructor() { }

  ngOnInit() {
  }

}
