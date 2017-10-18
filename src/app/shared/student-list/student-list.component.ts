import { Component, OnInit, Input, Output } from '@angular/core';
import { Student } from '../student.model';
import { Subscription } from 'rxjs/Subscription';
import { StudentService } from '../student.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  @Input() student: Student;
  @Output() studentSelected = new Subject<void>();
  
  students: Student[]; //Links to home.model and reminds Angular Student is an array
  private subscription: Subscription;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.students = this.studentService.getStudents(); //OnInit, Angular sets up student array
    this.subscription = this.studentService.studentsChanged.subscribe(
      (students: Student[]) => {
        this.students = students;
        // console.log("should be here",students)
      }
    );
    console.log(this.students)
  }

  onSelected() {
    this.studentService.studentSelected.next(this.student);
  }

  bindElementToStudent(data) { //Prevents errors when clicking (for assignment modal) the links within assignment-list
    if (data.target.id) { //prevents errors when hitting the links directly
      this.studentService.getStudentById(data.target.id);
    } else { //prevents errors within the modal itself
      
    }
  }

  onEditItem(index: number) {
    this.studentService.startedEditing.next(index);
  }

  ngOnDestroy() { //When subscription is not detected, automatically disables CRUD ability on data
    this.subscription.unsubscribe();
  }
}
