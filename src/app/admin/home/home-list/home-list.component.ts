import { Component, OnInit, Output } from '@angular/core';
import { Assignment } from '../../../shared/assignment.model';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {
  assignments: Assignment[];

  constructor() { }

  ngOnInit() {
  }

  onDetail(e) {
    console.log(e.target);
  }
}
