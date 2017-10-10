import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Assignment } from '../../../../shared/assignment.model';

@Component({
  selector: 'app-home-item',
  templateUrl: './home-item.component.html',
  styleUrls: ['./home-item.component.css']
})
export class HomeItemComponent implements OnInit {
  @Input() assignment: Assignment;
  @Output() assignmentSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onSelected() {
    this.assignmentSelected.emit();
  }

}
