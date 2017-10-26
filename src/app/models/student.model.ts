export class Student {
  constructor(public fname: string, public lname: string, public email: string, public cohort: string, public uid: string, public studentAssignments: object) {} //Type of student names - helps Angular look for strings when populating student table.
}