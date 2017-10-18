import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { Cohort } from '../add-cohort/cohort.model';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.css']
})
export class CreateAssignmentComponent implements OnInit {
  cohorts: Cohort[];
  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.onFetchData(); //Fetches data from FB onInit
  }

  onFetchData() {
    this.dataStorageService.getData(); //Attn. data-storage.service.ts
  }

}
