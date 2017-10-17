import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { Student } from '../../shared/student.model';
import { StudentService } from '../../shared/student.service';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.component.html',
  styleUrls: ['./home-student.component.css']
})
export class HomeStudentComponent implements OnInit {
  students: Student[];
  @ViewChildren(Student) Student: ElementRef; //Pulls Id from each student for individual ref => allows individual student for detail 

  constructor(private getStudent: StudentService) { }

  ngOnInit() {
    // console.log(this.students)    
  }

  onDetail(e) { //(click) of student list to get to modal 
    let data = this.getStudent.getStudent(e.target.id);
    console.log(e.target.id)
    console.log("Click worked")
  }
}
