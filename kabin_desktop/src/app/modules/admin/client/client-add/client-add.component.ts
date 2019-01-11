
import { Component, ElementRef, ViewChild, Inject, Input, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GlobalFunction } from '../../../../global/global';

import { ClientModel, AddressModel } from '../../../../models/models';
import { GenericProvider } from '../../../../providers/generic';
import { AppSettings } from '../../../../providers/app-settings';

@Component({
	selector: 'client-add',
	templateUrl: './client-add.component.html',
	styleUrls: ['../../admin.css']
})
export class ClientAddComponent implements OnInit {

	SmallSForm: FormGroup;

	@ViewChild('filter') filter: ElementRef;

	constructor(private gProvider: GenericProvider, private formBuilder: FormBuilder, public dialog: MatDialog) {
		this.SmallSForm = this.formBuilder.group({
			clientFirstname: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(40), Validators.required])],
			clientLastname: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(40), Validators.required])],
			clientFunction: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(100), Validators.required])],
			clientCardId: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(20)])],
			clientSex: ['', Validators.compose([Validators.required])],
			clientTels: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(20), Validators.required])],
			clientEmail: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(62), Validators.required])],
			clientDetails: ['', Validators.compose([Validators.maxLength(200)])],
			clientBirthday: ['', Validators.required],

			sAddressCountry: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(50), Validators.required])],
			sAddressState: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(50), Validators.required])],
			sAddressCity: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(50), Validators.required])],
			sAddressStreet: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(50), Validators.required])],
			sAddressDetails: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(100)])],
		});
	}

	fetchData(): void {
	}

	ngOnInit() {

	}

	deleteEmp(): void {

	}

	validateClient(): void {
		/* client ref addr */
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

		let emp: ClientModel = new ClientModel();
		emp.clientFirstname = this.SmallSForm.value.clientFirstname;
		emp.clientLastname = this.SmallSForm.value.clientLastname;
		emp.clientFunction = this.SmallSForm.value.clientFunction;
		emp.clientCardId = this.SmallSForm.value.clientCardId;
		emp.clientType = AppSettings.EMPLOYEE_TYPE;
		emp.clientDetails = this.SmallSForm.value.clientDetails;
		emp.clientBirthday = new Date(Date.parse(this.SmallSForm.value.clientBirthday)).toISOString().split("T")[0];
		emp.clientSex = this.SmallSForm.value.clientSex;
		emp.clientTels = this.SmallSForm.value.clientTels;
		emp.clientEmail = this.SmallSForm.value.clientEmail
		emp.clientActive = true;
		emp.createdBy = AppSettings.DEFAULT_USER.userUsername;
		emp.dateCreated = GlobalFunction.getCurrentDate(true);
		emp.modifiedBy = " ";
		emp.dateModified = GlobalFunction.getCurrentDate(true);

		/* insert addr, client, salary */
		console.log("adding address: ", sAddr);
		this.gProvider.addObj(sAddr, "/address").subscribe(data => {
			data.text();
			emp.addressId = parseInt(data.text());
			console.log(" on go add client, addr_id: ", emp, data);
			this.gProvider.add(emp, "/client").subscribe(data => {
				console.log(" adding client  success: ", data);
			}, error => {
				GlobalFunction.showMsgError();
				console.log(" adding client error: ", error);
			});
		}, error => {
			GlobalFunction.showMsgError();
			console.log(" error adding address fo client small staff: ", error);
		});
	}
}
