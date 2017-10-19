import { Component, OnInit } from '@angular/core';
import { Assignment } from '../../models/assignment.model';
import { Student } from '../../models/student.model';
import { AssignmentService } from '../../services/assignment.service';
import { StudentService } from '../../services/student.service';
import { DataStorageService } from '../../services/data-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  selectedAssignment: Assignment; 
  selectedStudent: Student;
  
  constructor(private assignmentService: AssignmentService, private studentService: StudentService, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.assignmentService.assignmentSelected.subscribe(
      (assignment: Assignment) => {
        this.selectedAssignment = assignment;
      } //OnInit, Angular sets up looking for assignments array
    );

    this.studentService.studentSelected.subscribe(
      (student: Student) => {
        this.selectedStudent = student;
      }
    )
    this.onFetchData(); //Also fetches assignments from FB
  }

  onFetchData() {
    this.dataStorageService.getData(); //Attn. data-storage.service.ts
  }
}
