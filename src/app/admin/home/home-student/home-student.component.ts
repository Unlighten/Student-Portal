import { Component, OnInit } from '@angular/core';
import { Student } from '../home.model';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.component.html',
  styleUrls: ['./home-student.component.css']
})
export class HomeStudentComponent implements OnInit {
  students: Student[];

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.students = this.homeService.getStudents();
  }

}
