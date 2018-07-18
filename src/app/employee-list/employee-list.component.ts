import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith} from 'rxjs/operators/';
import {map} from 'rxjs/operators/';
import {Employee, employees} from '../data-model';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Observable<Employee[]>;
  isLoading = false;
  selectedEmployee: Employee;
  selectedindex;
  Employees;
  stateCtrl: FormControl;
  filteredEmployees: Observable<any[]>;
  

  constructor(private employeeService: EmployeeService) { 

    this.stateCtrl = new FormControl();
    this.filteredEmployees = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this.filterEmployees(state) : employees.slice())
      );
  }

  ngOnInit() { this.getEmployees(); }

  getEmployees() {
    this.isLoading = true;
    this.employees = this.employeeService.getEmployees().pipe(finalize(() => this.isLoading = false));
    this.selectedEmployee = undefined;
  }

  selectEmp(employee: Employee,index) { 
    this.selectedEmployee = employee;
    this.selectedindex = index;
   }
  
  filterEmployees(employee: string) {
  return employees.filter(Empoyees=>
    Empoyees.name.toLowerCase().indexOf(employee.toLowerCase()) === 0);
  }

}
