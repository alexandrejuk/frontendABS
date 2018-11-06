import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable()
export class EmployeeService {
  private url = 'http://localhost:3000/api/v1/employees';

  private _employees: BehaviorSubject<Employee[]>;
  private dataStore: {
    employees: Employee[]
  };

  constructor(private http: HttpClient) {
    this.dataStore = { employees: [] };
    this._employees = <BehaviorSubject<Employee[]>>new BehaviorSubject([]);
  }

  get employees() {
    return this._employees.asObservable();
  }

  getAllEmployees(): void {
    this.http
      .get<Employee[]>(this.url)
      .subscribe(data => {
        this.dataStore.employees = data;
        this._employees.next(Object.assign({}, this.dataStore).employees);
      },
      error => console.log(error)
      );
  }

  addEmployee(employee): void {
    this.http
      .post<Employee>(this.url, employee)
      .subscribe(data => {
        this.dataStore.employees.push(data);
        this._employees.next(Object.assign({}, this.dataStore).employees);
      },
      error => console.log(error)
      );
  }

}
