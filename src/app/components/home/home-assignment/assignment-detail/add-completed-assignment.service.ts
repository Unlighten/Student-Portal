import { Subject } from "rxjs/Subject";
import { CAssignment } from "./add-completed-assignment.model";

export class AddCAssignmentService {
    cassignmentSelected = new Subject<CAssignment>();
    cassignmentChanged = new Subject<CAssignment[]>();
  
    private cassignments: CAssignment[] = [];

    setCompletedAssignmentData(cassignments: CAssignment[]) {
        this.cassignments = cassignments;
        this.cassignmentChanged.next(this.cassignments.slice());
    }
        
    addCompletedAssignment(cassignment: CAssignment) {
        this.cassignments.push(cassignment);
        this.cassignmentChanged.next(this.cassignments.slice());       
    }

    getCompletedAssignment() { //Pulls in data to infill CAssignment[]
        return this.cassignments.slice();
    }

}