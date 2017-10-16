import { Component, OnInit } from '@angular/core';
import { Assignment } from '../../../shared/assignment.model';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CreateAssignmentService } from '../../../admin/create-assignment/create-assignment.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  assignments: Assignment[];
  private subscription: Subscription;

  // closeResult: string; //Angular bootstrap
  
  constructor(private createAssignmentService: CreateAssignmentService, private modalService: NgbModal) { }

  ngOnInit() { //Creates and infills assignments onInit
    this.assignments = this.createAssignmentService.getAssignments();
    this.subscription = this.createAssignmentService.assignmentsChanged.subscribe(
      (assignments: Assignment[]) => {
        this.assignments = assignments;
      }
    )
  };

//   open(content) { //Angular bootstrap
//     this.modalService.open(content).result.then((result) => {
//       this.closeResult = `Close with: ${ result }`;
//     }, (reason) => {
//       this.closeResult = `Dismissed ${ this.getDismissReason(reason) }`;
//     });
//   }

//   //Angular bootstrap
//   private getDismissReason(reason: any): string {
//     if (reason === ModalDismissReasons.ESC) {
//       return 'by pressing ESC';
//     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
//       return 'by clicking on a backdrop';
//     } else {
//       return `with: ${ reason }`;
//     }
//   }
}
