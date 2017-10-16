import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../student.model';
import { Subscription } from 'rxjs/Subscription';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  @Input() student: Student;
  
  students: Student[]; //Links to home.model and reminds Angular Student is an array
  private subscription: Subscription;

  constructor(private homeService: StudentService) { }

  ngOnInit() {
    this.students = this.homeService.getStudents(); //OnInit, Angular sets up student array
    this.subscription = this.homeService.studentsChanged.subscribe(
      (students: Student[]) => {
        this.students = students;
        console.log("should be here",students)
      }
    );
  }

  ngOnDestroy() { //When subscription is not detected, automatically disables CRUD ability on data
    this.subscription.unsubscribe();
  }
}
