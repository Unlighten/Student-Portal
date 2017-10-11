import { Assignment } from "../../shared/assignment.model";
import { Subject } from "rxjs/Subject";

export class CreateAssignmentService {
  assignmentSelected = new Subject<Assignment>();
  assignmentsChanged = new Subject<Assignment[]>();
  startedEditing = new Subject<number>();

  private assignments: Assignment[] = [];

  setData(assignments: Assignment[]) {
    this.assignments = assignments;
    this.assignmentsChanged.next(this.assignments.slice());
  }

  getAssignments() {
    return this.assignments.slice();
  }

  getAssignment(index: number) {
    return this.assignments[index];
  }

  addAssignment(assignment: Assignment) {
    this.assignments.push(assignment);
    this.assignmentsChanged.next(this.assignments.slice());
  }

  updateAssignment(index: number, newAssignment: Assignment) {
    this.assignments[index] = newAssignment;
    this.assignmentsChanged.next(this.assignments.slice());
  }

  deleteAssignment(index: number) {
    this.assignments.splice(index, 1);
    this.assignmentsChanged.next(this.assignments.slice());
  }
}