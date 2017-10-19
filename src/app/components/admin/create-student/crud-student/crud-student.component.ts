import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Response } from '@angular/http';
import * as firebase from 'firebase';
import { Student } from '../../../../models/student.model';
import { Cohort } from '../../../../models/cohort.model';
import { CohortService } from '../../../../services/cohort.service';
import { StudentService } from '../../../../services/student.service';
import { DataStorageService } from '../../../../services/data-storage.service';

@Component({
  selector: 'app-crud-student',
  templateUrl: './crud-student.component.html',
  styleUrls: ['./crud-student.component.css']
})
export class CrudStudentComponent implements OnInit {
  @ViewChild('f') createAssignmentForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Student;
  cohorts: Cohort[];

  constructor(private cohortService: CohortService, private studentService: StudentService, private dataStorageService: DataStorageService) { }

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
    this.cohorts = this.cohortService.getCohorts();    
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

    firebase.auth().sendPasswordResetEmail(value.email)
      .then(function() {
        console.log('Password reset sent to ' + value.email);
      })
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
