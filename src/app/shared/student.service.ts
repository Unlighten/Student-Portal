import { Subject } from "rxjs/Subject";
import { Student } from "./student.model";

export class StudentService {
  studentSelected = new Subject<Student>();  
  studentsChanged = new Subject<Student[]>();

  private students: Student[] = [];//Sets array for assignments => infilled by FB
  
  setData(students: Student[]) { //Fills in data for assignments
    this.students = students;
    // console.log('data',this.students);
    this.studentsChanged.next(this.students.slice());
  }

  getStudents() {
    // console.log(this.students);
    
    return this.students.slice(); 
  }
}