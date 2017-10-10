import { Component, OnInit } from '@angular/core';
import { Assignment } from '../../shared/assignment.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedAssignment: Assignment;

  constructor() { }

  ngOnInit() {
  }

}
