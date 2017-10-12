import { Component, OnInit, Output, ViewChildren, ElementRef } from '@angular/core';
import { Assignment } from '../../../shared/assignment.model';
import { Subject } from 'rxjs/Subject';
import { CreateAssignmentService } from '../../create-assignment/create-assignment.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {
  assignments: Assignment[];
  @ViewChildren(Assignment) Assignment: ElementRef;

  closeResult: string;
  
  constructor(private createAssignment: CreateAssignmentService, private modalService: NgbModal) { }

  ngOnInit() {
  }

  onDetail(e) {
    let data = this.createAssignment.getAssignment(e.target.id);
    console.log(data)
    console.log("Click worked")
    // console.log(data.name)
    // console.log(data.description)
    // console.log(data.due)
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Close with: ${ result }`;
    }, (reason) => {
      this.closeResult = `Dismissed ${ this.getDismissReason(reason) }`;
    });
    console.log(content._parentView.component.createAssignment.assignments)
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${ reason }`;
    }
  }
}
