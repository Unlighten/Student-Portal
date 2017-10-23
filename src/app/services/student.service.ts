import { Subject } from "rxjs/Subject";
import { Student } from "../models/student.model";

export class StudentService {
  studentSelected = new Subject<Student>();  
  studentsChanged = new Subject<Student[]>();
  startedEditing = new Subject<number>();
  oneStudent = new Subject<any>();

  public students: Student[] = [];//Sets array for students => infilled by FB
  
  setStudentData(students: Student[]) { //Fills in data for students
    this.students = students;
    // console.log('data',this.students);
    this.studentsChanged.next(this.students.slice());
  }

  getStudents() { //Pulls in data to infill Student[]
    console.log(this.students);
    return this.students.slice(); 
  }
  
  getStudent(index: number) { //Pulls in data for individual student within Student[]
    return this.students[index];
  }

  addStudent(student: Student) { //Adds single student through add button (edit-student) => affects FB
    this.students.push(student);
    this.studentsChanged.next(this.students.slice());
  }

  updateStudent(index: number, newStudent: Student) { //Updates single student through add button (edit-student) => affects FB
    this.students[index] = newStudent;
    this.studentsChanged.next(this.students.slice());
  }

  deleteStudent(index: number) { //Deletes single student through delete button (edit-student) => affects FB
    this.students.splice(index, 1);
    this.studentsChanged.next(this.students.slice());
  }

  getStudentById(aid) {
    const studentById = this.students[aid];
    this.oneStudent.next(studentById);
  }
}