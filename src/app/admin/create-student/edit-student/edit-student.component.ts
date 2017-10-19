import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Student } from '../../../shared/student.model';
import { StudentService } from '../../../shared/student.service';
import { DataStorageService } from '../../../shared/data-storage.service';
import { Response } from '@angular/http';
import * as firebase from 'firebase';
import { Cohort } from '../../add-cohort/cohort.model';
import { AddCohortService } from '../../add-cohort/add-cohort.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  @ViewChild('f') createAssignmentForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Student;
  cohorts: Cohort[];

  constructor(private addCohortService: AddCohortService, private studentService: StudentService, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.subscription = this.studentService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.studentService.getStudent(index);
        this.createAssignmentForm.setValue({
          fname: this.editedItem.fname,
          lname: this.editedItem.lname,
          email: this.editedItem.email,
          password: 'nonulls',
          cohort: this.editedItem.cohort
        })
      }
    );
    this.cohorts = this.addCohortService.getCohorts();    
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newStudent = new Student(
      value.fname, 
      value.lname, 
      value.email, 
      value.cohort
    );
    if (this.editMode) {
      this.studentService.updateStudent(this.editedItemIndex, newStudent);
      this.onSaveData();
    } else {
      this.studentService.addStudent(newStudent);
      this.onSaveData();
    }
    this.editMode = false;
    form.reset();

    firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
      })
  }

  onSaveData() {
    this.dataStorageService.storeStudentData().subscribe(
      (response: Response) => {
      }
    );
  }

  onClear() {
    this.createAssignmentForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.studentService.deleteStudent(this.editedItemIndex);
    this.onClear();
    this.onSaveData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
