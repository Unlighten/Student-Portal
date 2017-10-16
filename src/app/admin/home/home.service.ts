import { Student } from "./home.model";
import { Subject } from "rxjs/Subject";

export class HomeService {
  studentSelected = new Subject<Student>();  
  studentsChanged = new Subject<Student[]>();

  private students: Student[] = [];//Sets array for assignments => infilled by FB
  
  setData(students: Student[]) { //Fills in data for assignments
    this.students = students;
    this.studentsChanged.next(this.students.slice());
  }

  getStudents() {
    return this.students.slice(); 
  }
}