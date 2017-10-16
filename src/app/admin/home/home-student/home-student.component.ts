import { Component, OnInit } from '@angular/core';
import { Student } from '../home.model';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.component.html',
  styleUrls: ['./home-student.component.css']
})
export class HomeStudentComponent implements OnInit {
  students: Student[]; //Links to home.model and reminds Angular Student is an array

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.students = this.homeService.getStudents(); //OnInit, Angular sets up student array
  }

}
