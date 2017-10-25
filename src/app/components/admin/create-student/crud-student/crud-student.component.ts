import { Component, OnInit, ViewChild, OnDestroy, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Response } from '@angular/http';
import * as firebase from 'firebase';
import { Student } from '../../../../models/student.model';
import { Cohort } from '../../../../models/cohort.model';
import { CohortService } from '../../../../services/cohort.service';
import { StudentService } from '../../../../services/student.service';
import { DataStorageService } from '../../../../services/data-storage.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-crud-student',
  templateUrl: './crud-student.component.html',
  styleUrls: ['./crud-student.component.css']
})
export class CrudStudentComponent implements OnInit {
  @Output() renewData = new Subject<any>()
  @ViewChild('f') createAssignmentForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Student;
  cohorts
  studentKey

  constructor(private cohortService: CohortService, private studentService: StudentService, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.subscription = this.studentService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.studentService.getStudent(index);
        this.studentKey = this.studentService.getStudent(index);
        this.createAssignmentForm.setValue({
          fname: this.editedItem.fname,
          lname: this.editedItem.lname,
          email: this.editedItem.email,
          password: 'nonulls',
          cohort: this.editedItem.cohort
        })
      }
    );
    this.cohorts = this.cohortService.receiveCohorts(); 
    // console.log('wowee', this.cohorts)   
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newStudent = new Student(
      value.fname, 
      value.lname, 
      value.email, 
      value.cohort
    );
    const cohortKey = value.cohort
    if (this.editMode) {
      this.studentService.updateStudent(this.editedItemIndex, newStudent);
      this.onUpdateData(cohortKey, newStudent)
    } else {
      this.studentService.addStudent(newStudent);
      this.onSaveData(cohortKey, newStudent);
    }

    firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
    .catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
    })

    // firebase.auth().sendPasswordResetEmail(value.email)
    // .then(function() {
    //   console.log('Password reset sent to ' + value.email);
    // })
    // .catch(function(error) {
    //   let errorCode = error.code;
    //   let errorMessage = error.message;
    // })
    
    this.editMode = false;
    form.reset();

    this.cohortService.renewCohortData()
  }

  onSaveData(cohortKey, newStudent) {
    this.dataStorageService.storeStudentData(cohortKey, newStudent);
  }

  onUpdateData(cohortKey, newStudent) {
    this.studentKey = this.studentKey.studentKey
    console.log(' new wer student ', newStudent)
    this.dataStorageService.updateStudentData(cohortKey, newStudent, this.studentKey)
  }
  onClear() {
    this.createAssignmentForm.reset();
    this.editMode = false;
  }

  // onDelete() {
  //   this.studentService.deleteStudent(this.editedItemIndex);
  //   this.onClear();
  //   this.onSaveData(cohortKey, newStudent);
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
