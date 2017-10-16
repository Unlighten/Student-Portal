import { Component, OnInit, Output, ViewChildren, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Assignment } from '../../shared/assignment.model';
import { CreateAssignmentService } from '../../admin/create-assignment/create-assignment.service';

@Component({
  selector: 'app-home-assignment',
  templateUrl: './home-assignment.component.html',
  styleUrls: ['./home-assignment.component.css']
})
export class HomeAssignmentComponent implements OnInit {
  assignments: Assignment[];
  @ViewChildren(Assignment) Assignment: ElementRef; //Pulls Id from each assignment for individual ref => allows individual assignment for detail 
  closeResult: string; //Angular bootstrap
  
  constructor(private createAssignment: CreateAssignmentService, private modalService: NgbModal) { }

  ngOnInit() {
  }

  onDetail(e) { //(click) of assignment list to get to modal 
    let data = this.createAssignment.getAssignment(e.target.id);
    // console.log(data)
    // console.log("Click worked")
    console.log(data.name)
    console.log(data.description)
    console.log(data.due)
  }
}
