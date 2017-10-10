import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Assignment } from '../../../shared/assignment.model';
import { CreateAssignmentService } from '../create-assignment.service';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css']
})
export class CreateEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('descInput') descInputRef: ElementRef;
  @ViewChild('dueInput') dueInputRef: ElementRef;

  constructor(private createAssignmentService: CreateAssignmentService) { }

  ngOnInit() {
  }

  onAddItem() {
    const assignName = this.nameInputRef.nativeElement.value;
    const assignDesc = this.descInputRef.nativeElement.value;
    const assignDue = this.dueInputRef.nativeElement.value;
    
    const newAssignment = new Assignment(assignName, assignDesc, assignDue);

    this.createAssignmentService.addAssignment(newAssignment);
  }

}
