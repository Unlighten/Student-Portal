import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../../services/data-storage.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.onFetchData(); //Fetches data from FB onInit
  }

  onFetchData() {
    this.dataStorageService.getData(); //Attn. data-storage.service.ts
  }
}
