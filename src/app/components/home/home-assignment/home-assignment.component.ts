import { Component, OnInit, Output, Input } from '@angular/core';
import { DataStorageService } from '../../../services/data-storage.service';

@Component({
  selector: 'app-home-assignment',
  templateUrl: './home-assignment.component.html',
  styleUrls: ['./home-assignment.component.css']
})
export class HomeAssignmentComponent implements OnInit {
  @Input() cohorts
  constructor(private dataStorageService: DataStorageService) {}
  ngOnInit() {
  }

  async getData() {
    this.cohorts = await this.dataStorageService.getData()
  }
}
