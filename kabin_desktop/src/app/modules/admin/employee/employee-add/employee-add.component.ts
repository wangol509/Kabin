
import { Component, ElementRef, ViewChild, Inject, Input, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GlobalFunction } from '../../../../global/global';

import { EmployeeModel, EmployeeSalaryModel, AddressModel } from '../../../../models/models';
import { GenericProvider } from '../../../../providers/generic';
import { AppSettings } from '../../../../providers/app-settings';

@Component({
	selector: 'employee-add',
	templateUrl: './employee-add.component.html',
	styleUrls: ['../../admin.css']
})
export class EmployeeAddComponent implements OnInit {

	SmallSForm: FormGroup;

	@ViewChild('filter') filter: ElementRef;

	constructor(private gProvider: GenericProvider, private formBuilder: FormBuilder, public dialog: MatDialog) {
		this.SmallSForm = this.formBuilder.group({
			employeeFirstname: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(40), Validators.required])],
			employeeLastname: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(40), Validators.required])],
			employeeFunction: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(100), Validators.required])],
			employeeCardId: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(20)])],
			employeeSex: ['', Validators.compose([Validators.required])],
			employeeTels: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(20), Validators.required])],
			employeeEmail: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(62), Validators.required])],
			employeeDetails: ['', Validators.compose([Validators.maxLength(200)])],
			employeeBirthday: ['', Validators.required],

			sAddressCountry: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(50), Validators.required])],
			sAddressState: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(50), Validators.required])],
			sAddressCity: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(50), Validators.required])],
			sAddressStreet: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(50), Validators.required])],
			sAddressDetails: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(100)])],

			employeeSalaryValue: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(20), Validators.required])],
			employeeSalaryPaymentFreq: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(4), Validators.required])],
		});
	}

	fetchData(): void {
	}

	ngOnInit() {

	}

	deleteEmp(): void {

	}

	validateEmployee(): void {
		/* employee ref addr */
		let sAddr = new AddressModel();
		sAddr.addressId = null;
		sAddr.addressCountry = this.SmallSForm.value.sAddressCountry;
		sAddr.addressState = this.SmallSForm.value.sAddressState;
		sAddr.addressCity = this.SmallSForm.value.sAddressCity;
		sAddr.addressStreet = this.SmallSForm.value.sAddressStreet;
		sAddr.addressDetails = this.SmallSForm.value.sAddressDetails;
		sAddr.createdBy = AppSettings.DEFAULT_USER.userUsername;
		sAddr.dateCreated = GlobalFunction.getCurrentDate(true);
		sAddr.modifiedBy = " ";
		sAddr.dateModified = GlobalFunction.getCurrentDate(true);

		let emp: EmployeeModel = new EmployeeModel();
		emp.employeeFirstname = this.SmallSForm.value.employeeFirstname;
		emp.employeeLastname = this.SmallSForm.value.employeeLastname;
		emp.employeeFunction = this.SmallSForm.value.employeeFunction;
		emp.employeeCardId = this.SmallSForm.value.employeeCardId;
		emp.employeeType = AppSettings.EMPLOYEE_TYPE;
		emp.employeeDetails = this.SmallSForm.value.employeeDetails;
		emp.employeeBirthday = new Date(Date.parse(this.SmallSForm.value.employeeBirthday)).toISOString().split("T")[0];
		emp.employeeSex = this.SmallSForm.value.employeeSex;
		emp.employeeTels = this.SmallSForm.value.employeeTels;
		emp.employeeEmail = this.SmallSForm.value.employeeEmail
		emp.employeeActive = true;
		emp.createdBy = AppSettings.DEFAULT_USER.userUsername;
		emp.dateCreated = GlobalFunction.getCurrentDate(true);
		emp.modifiedBy = " ";
		emp.dateModified = GlobalFunction.getCurrentDate(true);

		let ems: EmployeeSalaryModel = new EmployeeSalaryModel();
		ems.employeeSalaryValue = this.SmallSForm.value.employeeSalaryValue;
		ems.employeeSalaryPaymentFreq = this.SmallSForm.value.employeeSalaryPaymentFreq;
		ems.createdBy = AppSettings.DEFAULT_USER.userUsername;
		ems.dateCreated = GlobalFunction.getCurrentDate(true);
		ems.modifiedBy = " ";
		ems.dateModified = GlobalFunction.getCurrentDate(true);

		/* insert addr, employee, salary */
		console.log("adding address: ", sAddr);
		this.gProvider.addObj(sAddr, "/address").subscribe(data => {
			data.text();
			emp.addressId = parseInt(data.text());
			console.log(" on go add employee, addr_id: ", emp, data);
			this.gProvider.add(emp, "/employee").subscribe(data => {
				console.log(" adding employee  success: ", data);
				ems.employeeId = parseInt(data.toString().trim());
				this.gProvider.add(ems, "/employee_salary").subscribe(data => {
					console.log("adding employee salary success: ", data);
					this.SmallSForm.reset();
					GlobalFunction.showMsgSuccess();
				}, error => {
					this.SmallSForm.reset();
					GlobalFunction.showMsgError();
					console.log("adding employee salary error: ", error);
				});
			}, error => {
				GlobalFunction.showMsgError();
				console.log(" adding employee error: ", error);
			});
		}, error => {
			GlobalFunction.showMsgError();
			console.log(" error adding address fo employee small staff: ", error);
		});
	}
}
