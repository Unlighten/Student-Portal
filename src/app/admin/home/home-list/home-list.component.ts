import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Assignment } from '../../../shared/assignment.model';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {
  @Output() assignmentWasSelected = new EventEmitter<Assignment>();
  assignments: Assignment[] = [
    new Assignment('CSS Monster', 'This is really hard', '08/14/2017'),
    new Assignment('Static Website', 'HTML and CSS', '08/21/2017')
  ];

  constructor() { }

  ngOnInit() {
  }

  onAssignmentSelected(assignment: Assignment) {
    this.assignmentWasSelected.emit(assignment);
  }

}
