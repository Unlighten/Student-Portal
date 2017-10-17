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
  @ViewChildren(Student) Student: ElementRef; //Pulls Id from each assignment for individual ref => allows individual assignment for detail 
  closeResult: string; //Angular bootstrap
  
  constructor(private getStudent: StudentService) { }

  ngOnInit() {

  }

  onDetail(e) { //(click) of assignment list to get to modal 
    let data = this.getStudent.getStudent(e.target.id);
    // console.log(data)
    console.log("Click worked")
    // console.log(data.name)
    // console.log(data.description)
    // console.log(data.due)
  }
}
