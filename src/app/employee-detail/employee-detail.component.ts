import { Component, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup} from '@angular/forms';
import { Address, Employee,proviences } from '../data-model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnChanges {

  @Input() employee: Employee;
  
  
  EmployeeForm: FormGroup;
  nameChangeLog: string[] = [];
  proviences = proviences;
  
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService) {

    this.createForm();
    this.logNameChange();
  }

  createForm() {
    this.EmployeeForm = this.fb.group({
      name: [''],
      surname: [''],
      addressList: this.fb.array([])
    });
  }

  ngOnChanges() {
    this.rebuildForm();
  }

  rebuildForm() {
    this.EmployeeForm.reset({
      name: this.employee.name,
      surname: this.employee.surname
    });
    this.setAddresses(this.employee.addresses);
  }

  get addressList(): FormArray {
    return this.EmployeeForm.get('addressList') as FormArray;
  };

  setAddresses(addresses: Address[]) {
    const address = addresses.map(address => this.fb.group(address));
    const addressFormArray = this.fb.array(address);
    this.EmployeeForm.setControl('addressList', addressFormArray);
  }

  addAddress() {
    this.addressList.push(this.fb.group(new Address()));
  }

  deleteEmp() {
    var diolog = confirm('Are you sure you want to Delele \n' + this.employee.name  + ' '+  this.employee.surname  +  ' ?');

    if (diolog == true)
    {
      this.employee = this.prepareSaveEmployee();
    this.employeeService.DeleteEmployee(this.employee).subscribe(
      result => {
        console.log(result)
      },
      error => {
        console.log("Error",error)
      },
      () => {
        console.log("No Errors")
      }
    );
    
    this.employee = undefined;
    }
    
  }
  onSubmit() {
    this.employee = this.prepareSaveEmployee();
    this.employeeService.updateEmployee(this.employee).subscribe(
      result => {
        console.log(result);
      },
      error => {
        
        console.log("Error",error);
      },
      () => {
        alert('Details Updated Succesfully for \n' + this.employee.name  + ' '+  this.employee.surname  +'');
      }
    );
    
    this.rebuildForm();
  }

  prepareSaveEmployee(): Employee {
    const formModel = this.EmployeeForm.value;

    // deep copy of form model
    const addressListDeepCopy: Address[] = formModel.addressList.map(
      (address: Address) => Object.assign({}, address)
    );

    // return new `Employee` object
    const saveEmployee: Employee = {
      id: this.employee.id,
      name: formModel.name as string,
      surname: formModel.surname as string,
      addresses: addressListDeepCopy
    };
    return saveEmployee;
  }

  revert() { this.rebuildForm(); }

  logNameChange() {
    const nameControl = this.EmployeeForm.get('name');
    nameControl.valueChanges.forEach(
      (value: string) => this.nameChangeLog.push(value)
    );
  }


  ngOnInit() {
  }

}
