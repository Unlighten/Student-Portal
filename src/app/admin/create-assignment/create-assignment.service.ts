import { EventEmitter } from "@angular/core";
import { Assignment } from "../../shared/assignment.model";
import { Subject } from "rxjs/Subject";

export class CreateAssignmentService {
  assignmentSelected = new EventEmitter<Assignment>();
  assignmentsChanged = new Subject<Assignment[]>();

  private assignments: Assignment[] = [
    new Assignment('CSS Monster', 'This is really hard', '08/14/2017'),
    new Assignment('Static Website', 'HTML and CSS', '08/21/2017')
  ];

  getAssignments() {
    return this.assignments.slice();
  }

  addAssignment(assignment: Assignment) {
    this.assignments.push(assignment);
    this.assignmentsChanged.next(this.assignments.slice());
  }
}