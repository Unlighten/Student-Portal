import { Component, OnInit, Output, ViewChildren, ElementRef } from '@angular/core';
import { Assignment } from '../../../shared/assignment.model';
import { Subject } from 'rxjs/Subject';
import { CreateAssignmentService } from '../../create-assignment/create-assignment.service';


@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {
  assignments: Assignment[];
  @ViewChildren(Assignment) Assignment: ElementRef;

  constructor(private createAssignment: CreateAssignmentService) { }

  ngOnInit() {
  }

  onDetail(e) {
    let data = this.createAssignment.getAssignment(e.target.id);
    console.log()
    // console.log(this.Assignment)
    console.log(data.name)
    console.log(data.description)
    console.log(data.due)
  }
}
