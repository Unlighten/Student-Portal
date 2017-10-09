import { Component, OnInit } from '@angular/core';
import { Assignment } from '../../shared/assignment.model';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.css']
})
export class CreateAssignmentComponent implements OnInit {
  assignments: Assignment[] = [
    new Assignment('CSS Monster', 'This is really hard', '08/14/2017'),
    new Assignment('Static Website', 'HTML and CSS', '08/21/2017')
  ];

  constructor() { }

  ngOnInit() {
  }

}
