import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {

  @Input() employeeForm;
  @Output() sendEmployee = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  save() {
    if (this.employeeForm.valid) {
      this.sendEmployee.emit(true);
    }
  }

}
