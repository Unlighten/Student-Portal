import { Component, OnInit, Input } from '@angular/core';
import { Assignment } from '../../../../shared/assignment.model';
import { CreateAssignmentService } from '../../../create-assignment/create-assignment.service';

@Component({
  selector: 'app-home-item',
  templateUrl: './home-item.component.html',
  styleUrls: ['./home-item.component.css']
})
export class HomeItemComponent implements OnInit {
  @Input() assignment: Assignment;

  constructor(private createAssignmentService: CreateAssignmentService) { }

  ngOnInit() {
  }

  onSelected() {
    this.createAssignmentService.assignmentSelected.emit(this.assignment);
  }

}
