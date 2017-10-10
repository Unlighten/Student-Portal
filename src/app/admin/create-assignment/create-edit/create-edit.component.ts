import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Assignment } from '../../../shared/assignment.model';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css']
})
export class CreateEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('descInput') descInputRef: ElementRef;
  @ViewChild('dueInput') dueInputRef: ElementRef;
  @Output() assignmentAdded = new EventEmitter<Assignment>();

  constructor() { }

  ngOnInit() {
  }

  onAddItem() {
    const assignName = this.nameInputRef.nativeElement.value;
    const assignDesc = this.descInputRef.nativeElement.value;
    const assignDue = this.dueInputRef.nativeElement.value;
    
    const newAssignment = new Assignment(assignName, assignDesc, assignDue);
    this.assignmentAdded.emit(newAssignment);
  }

}
