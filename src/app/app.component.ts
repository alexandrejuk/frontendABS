import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from './services/employee.service';
import { Employee } from './models/employee';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  public employeeForm: FormGroup;
  public employees$: Observable<Employee[]>;
  public dataChar;

  constructor(
    private _fb: FormBuilder,
    private employeeService: EmployeeService
  ) {  }

  ngOnInit() {
    this.initForm();
    this.getEmployees();
  }

  initForm() {
    this.employeeForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      participation: ['', Validators.required],
    });
  }

  getEmployees() {
    this.employees$ = this.employeeService.employees.pipe(map(employees => {
      this.dataChar = employees.map(
        employee => ({
          name: employee.firstName,
          value: employee.participation
        }));
      return employees;
    }));
    this.employeeService.getAllEmployees();
  }

  saveEmployee(e) {
    this.employeeService.addEmployee(this.employeeForm.value);
  }
}
