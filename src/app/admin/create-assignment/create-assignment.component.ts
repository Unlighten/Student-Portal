import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.css']
})
export class CreateAssignmentComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.onFetchData();
  }

  onFetchData() {
    this.dataStorageService.getData();
  }

}
