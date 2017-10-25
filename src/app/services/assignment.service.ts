import { Subject } from "rxjs/Subject";
import { Assignment } from "../models/assignment.model";

export class AssignmentService {
  assignmentSelected = new Subject<any>();
  assignmentsChanged = new Subject<any[]>();
  startedEditing = new Subject<number>();
  oneAssignment = new Subject<any>(); //Binds single assignments to oneAssignment

  private assignments: Assignment[] = []; //Sets array for assignments => infilled by FB

  setAssignmentData(assignments: Array<any>) { //Fills in data for assignments
    this.assignments = assignments;
    this.assignmentsChanged.next(this.assignments.slice());
  }

  clearAssignments() {
  }
  
  getAssignments() { //Pulls in data to infill Assignment[]
    return this.assignments.slice();
  }

  getAssignment(index: number) { //Pulls in data for individual assignment within Assignment[]
    console.log('get assignment ', this.assignments[index])
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

  getAssignmentById(aid) { //Accesses individual assignments for modal
    const getAssignmentById = this.assignments[aid];
    console.log('this assignment service ', this.assignments)
    this.oneAssignment.next(getAssignmentById);
  }
}