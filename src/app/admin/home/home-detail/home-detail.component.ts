import { Component, OnInit } from '@angular/core';
import { Assignment } from '../../../shared/assignment.model';
import { CreateAssignmentService } from '../../create-assignment/create-assignment.service';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.css']
})
export class HomeDetailComponent implements OnInit {
  assignments: Assignment[];
  private subscription: Subscription;

  closeResult: string;
  
  constructor(private createAssignmentService: CreateAssignmentService, private modalService: NgbModal) { }

  ngOnInit() {
    this.assignments = this.createAssignmentService.getAssignments();
    this.subscription = this.createAssignmentService.assignmentsChanged.subscribe(
      (assignments: Assignment[]) => {
        this.assignments = assignments;
      }
    )
  };

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Close with: ${ result }`;
    }, (reason) => {
      this.closeResult = `Dismissed ${ this.getDismissReason(reason) }`;
    });
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
