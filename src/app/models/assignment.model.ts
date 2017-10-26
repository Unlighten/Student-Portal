export class Assignment { //set for what Angular is to look for
  constructor(public name: string, public description: string, public due: string, public cohort: string, public assignmentKey: string, public completedAssignments: object) {}
}