import { Component, OnInit } from '@angular/core';
import { Assignment } from '../../shared/assignment.model';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  selectedAssignment: Assignment;

  constructor() { }

  ngOnInit() {
  }

}
