import { Component, OnInit } from '@angular/core';
import { Assignment } from '../shared/assignment.model';
import { StudentService } from '../shared/student.service';
import { CreateAssignmentService } from '../admin/create-assignment/create-assignment.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Student } from '../shared/student.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  selectedAssignment: Assignment; 
  selectedStudent: Student;

  constructor(private createAssignmentService: CreateAssignmentService, private studentService: StudentService, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.createAssignmentService.assignmentSelected.subscribe(
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
