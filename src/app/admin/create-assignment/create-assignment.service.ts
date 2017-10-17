import { Assignment } from "../../shared/assignment.model";
import { Subject } from "rxjs/Subject";

export class CreateAssignmentService {
  assignmentSelected = new Subject<Assignment>();
  assignmentsChanged = new Subject<Assignment[]>();
  startedEditing = new Subject<number>();

  private assignments: Assignment[] = []; //Sets array for assignments => infilled by FB

  setAssignmentData(assignments: Assignment[]) { //Fills in data for assignments
    this.assignments = assignments;
    this.assignmentsChanged.next(this.assignments.slice());
  }

  getAssignments() { //Pulls in data to infill Assignment[]
    return this.assignments.slice();
  }

  getAssignment(index: number) { //Pulls in data for individual assignment within Assignment[]
    return this.assignments[index];
  }

  addAssignment(assignment: Assignment) { //Adds single assignment through add button (create-assignment) => affects FB
    this.assignments.push(assignment);
    this.assignmentsChanged.next(this.assignments.slice());
  }

  updateAssignment(index: number, newAssignment: Assignment) { //Updates single assignment through add button (create-assignment) => affects FB
    this.assignments[index] = newAssignment;
    this.assignmentsChanged.next(this.assignments.slice());
  }

  deleteAssignment(index: number) { //Deletes single assignment through delete button (create-assignment) => affects FB
    this.assignments.splice(index, 1);
    this.assignmentsChanged.next(this.assignments.slice());
  }
}