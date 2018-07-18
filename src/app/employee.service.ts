import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Employee, employees } from './data-model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  delayMs = 500;

  // Fake server get;
  getEmployees(): Observable<Employee[]> {
    return of(employees).pipe(delay(this.delayMs)); // simulate latency with delay
  }

  // Fake server update;
  updateEmployee(employee: Employee): Observable<Employee>  {
    const oldEmployee = employees.find(e => e.id === employee.id);
    const newEmployee = Object.assign(oldEmployee, employee); // mutate cached Employee
    return of(newEmployee).pipe(delay(this.delayMs)); // simulate latency with delay
  }

 // Fake server Delete;
  DeleteEmployee(employee: Employee): Observable<Employee[]>  {
    employees.find(e => e.id === employee.id);
    const getindex = employees.indexOf(employees.find(h => h.id === employee.id));
    employees.splice(getindex, 1);
    console.log(employees);
    return of(employees).pipe(delay(this.delayMs)); // simulate latency with delay
  }
}
