import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../home.model';
import { HomeService } from '../home.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.component.html',
  styleUrls: ['./home-student.component.css']
})
export class HomeStudentComponent implements OnInit {
  @Input() student: Student;
  
  students: Student[]; //Links to home.model and reminds Angular Student is an array
  private subscription: Subscription;

  constructor(private homeService: HomeService) { }

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
