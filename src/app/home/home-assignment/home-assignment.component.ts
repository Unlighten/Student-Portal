import { Component, OnInit, Output, ViewChildren, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Assignment } from '../../shared/assignment.model';
import { CreateAssignmentService } from '../../admin/create-assignment/create-assignment.service';

@Component({
  selector: 'app-home-assignment',
  templateUrl: './home-assignment.component.html',
  styleUrls: ['./home-assignment.component.css']
})
export class HomeAssignmentComponent implements OnInit {
  assignments: Assignment[];
  
  constructor(private createAssignmentService: CreateAssignmentService) { }

  ngOnInit() {
  }
}
