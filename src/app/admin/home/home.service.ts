import { Student } from "./home.model";

export class HomeService {
  private students: Student[] = [
    new Student('Nathan Bogan'),
    new Student('Thomas McClellan'),
    new Student('Aaron Moore'),
    new Student('Maximilian Schwarzmüller')
  ];

  getStudents() {
    return this.students.slice(); 
  }
}