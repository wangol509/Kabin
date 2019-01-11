
import { Component, ElementRef, ViewChild, Inject, Input, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GlobalFunction } from '../../../../global/global';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import { EmployeeModel, AddressModel, EmployeeSalaryModel } from '../../../../models/models';
import { GenericProvider } from '../../../../providers/generic';
import { AppSettings } from '../../../../providers/app-settings';


@Component({
  selector: 'employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['../../admin.css']
})
export class EmployeeUpdateComponent {
  addr: AddressModel;
  emp: EmployeeModel;
  EmployeeForm: FormGroup;
  employeSalary: EmployeeSalaryModel;
  etype = "Professeur";

  constructor(private gProvider: GenericProvider, public dialogRef: MatDialogRef<EmployeeUpdateComponent>, public formBuilder: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private data: any) {
    console.clear();

    this.emp = this.data.emp;
    this.addr = this.data.addr;
    this.employeSalary = this.data.empsal;

    console.log("data: ", this.data);

    this.EmployeeForm = this.formBuilder.group({
      employeeFirstname: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(40), Validators.required])],
      employeeLastname: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(40), Validators.required])],
      employeeFunction: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(100), Validators.required])],
      employeeCardId: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(20)])],
      employeeSex: ['', Validators.compose([Validators.required])],
      employeeTels: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(20), Validators.required])],
      employeeEmail: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(62), Validators.required])],
      employeeDetails: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(200)])],
      employeeBirthday: ['', Validators.required],

      sAddressCountry: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(50), Validators.required])],
      sAddressState: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(50), Validators.required])],
      sAddressCity: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(50), Validators.required])],
      sAddressStreet: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(50), Validators.required])],
      sAddressDetails: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(100)])],

      employeeSalaryValue: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(20)])],
      employeeSalaryPaymentFreq: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(4)])],
    });

    this.initForm();
  }


  closeWindow(): void {
    this.dialogRef.close();
  }

  validateEmployee(): void {
    /* employee ref addr */
    let sAddr = new AddressModel();
    sAddr.addressId = this.addr.addressId;
    sAddr.addressCountry = this.EmployeeForm.value.sAddressCountry;
    sAddr.addressState = this.EmployeeForm.value.sAddressState;
    sAddr.addressCity = this.EmployeeForm.value.sAddressCity;
    sAddr.addressStreet = this.EmployeeForm.value.sAddressStreet;
    sAddr.addressDetails = this.EmployeeForm.value.sAddressDetails;
    sAddr.createdBy = this.addr.dateCreated;
    sAddr.dateCreated = GlobalFunction.getCurrentDate(true);
    sAddr.modifiedBy = AppSettings.DEFAULT_USER.userUsername;
    sAddr.dateModified = GlobalFunction.getCurrentDate(true);

    let emp: EmployeeModel = new EmployeeModel();
    emp.employeeId = this.emp.employeeId;
    emp.employeeFirstname = this.EmployeeForm.value.employeeFirstname;
    emp.employeeLastname = this.EmployeeForm.value.employeeLastname;
    emp.employeeFunction = this.EmployeeForm.value.employeeFunction;
    emp.employeeCardId = this.EmployeeForm.value.employeeCardId;
    emp.employeeType = "teacher";
    emp.employeeDetails = this.EmployeeForm.value.employeeDetails;
    emp.employeeBirthday = new Date(Date.parse(this.EmployeeForm.value.employeeBirthday)).toISOString().split("T")[0];
    emp.employeeSex = this.EmployeeForm.value.employeeSex;
    emp.employeeTels = this.EmployeeForm.value.employeeTels;
    emp.employeeEmail = this.EmployeeForm.value.employeeEmail
    emp.employeeActive = true;
    emp.createdBy = this.emp.dateCreated;
    emp.dateCreated = GlobalFunction.getCurrentDate(true);
    emp.modifiedBy = AppSettings.DEFAULT_USER.userUsername;
    emp.dateModified = GlobalFunction.getCurrentDate(true);

    let ems: EmployeeSalaryModel = new EmployeeSalaryModel();
    ems.employeeSalaryId = this.employeSalary.employeeSalaryId;
    ems.employeeId = this.emp.employeeId;
    ems.employeeSalaryValue = this.EmployeeForm.value.employeeSalaryValue;
    ems.employeeSalaryPaymentFreq = this.EmployeeForm.value.employeeSalaryPaymentFreq;
    ems.createdBy = this.employeSalary.createdBy;
    ems.dateCreated = GlobalFunction.getCurrentDate(true);
    ems.modifiedBy = AppSettings.DEFAULT_USER.userUsername;
    ems.dateModified = GlobalFunction.getCurrentDate(true);

    /* insert addr, employee, salary */
    this.gProvider.update(sAddr, "/address").subscribe(data => {

      console.log(" update address success : ", this.addr);
      emp.addressId = this.addr.addressId;

      this.gProvider.update(emp, "/employee").subscribe(data => {

        console.log(" update employee  success: ", data);

        this.gProvider.update(ems, "/employee_salary").subscribe(data => {
          console.log("update employee salary success: ", data);
          this.closeWindow();
          GlobalFunction.showMsgSuccess();
        }, error => {
          console.log("update employee salary error: ", error);
        });
      }, error => {
        console.log(" update employee error: ", error);
      });
    }, error => {
      console.log(" error update address fo employee employee: ", error);
    });
  }


  initForm(): void {
    this.EmployeeForm.patchValue({
      "employeeFirstname": this.emp.employeeFirstname,
      "employeeLastname": this.emp.employeeLastname,
      "employeeFunction": this.emp.employeeFunction,
      "employeeCardId": this.emp.employeeCardId,
      "employeeBirthday": this.emp.employeeBirthday,
      "employeeSex": this.emp.employeeSex,
      "employeeTels": this.emp.employeeTels,
      "employeeEmail": this.emp.employeeEmail,
      "employeeDetails": this.emp.employeeDetails,
      "sAddressCountry": this.addr.addressCountry,
      "sAddressState": this.addr.addressState,
      "sAddressCity": this.addr.addressCity,
      "sAddressStreet": this.addr.addressStreet,
      "sAddressDetails": this.addr.addressDetails,
      "employeeSalaryValue": this.employeSalary.employeeSalaryValue,
      "employeeSalaryPaymentFreq": this.employeSalary.employeeSalaryPaymentFreq
    });
  }
}

