
import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmployeePaymentModel, EmployeeModel } from '../../../../models/models';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { GenericProvider } from '../../../../providers/generic';
import { AppSettings } from '../../../../providers/app-settings';
import { GlobalFunction } from '../../../../global/global';

/* employee database */
export class EmployeePaymentDatabase {
	/** Stream that emits whenever the data has +een modified. */
	dataChange: BehaviorSubject<Object[]> = new BehaviorSubject<Object[]>([]);

	get data(): Object[] {
		return this.dataChange.value;
	}

	constructor(private gProvider: GenericProvider, uri: string) {
		console.clear();

		this.gProvider.getData(uri).subscribe(data => {
			console.log("employee data: ", data);
			this.dataChange.next(<Array<Object>>data);
		}, error => {
			console.log("data error: ", error);
		});
	}
}

/* report employee database */
export class ReportDatabase {
	dataChange: BehaviorSubject<Object[]> = new BehaviorSubject<Object[]>([]);

	get data(): Object[] {
		return this.dataChange.value;
	}

	constructor(private gProvider: GenericProvider, uri: string) {
		this.gProvider.getData(uri).subscribe(data => {
			console.log("employee data: ", data);
			this.dataChange.next(<Array<Object>>data);
		}, error => {
			console.log("data error: ", error);
		})
	}
}

export class EmployeeDataSource extends DataSource<any> {
	constructor(private stDb: EmployeePaymentDatabase, private _paginator: MatPaginator) {
		super();
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<Object[]> {
		const displayDataChanges = [
			this.stDb.dataChange,
			this._paginator.page,
		];

		return Observable.merge(...displayDataChanges).map(() => {
			const data = this.stDb.data.slice();

			// Grab the page's slice of data.
			const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
			return data.splice(startIndex, this._paginator.pageSize);
		});
	}

	disconnect() { }
}

/*
	create details student component dialog
*/
@Component({
	selector: 'app-employee-pay-details',
	templateUrl: './employee-pay-details.html',
	styleUrls: ['../../admin.css'],
	providers: [GenericProvider]
})
export class EmployeePaymentDetails {

	stdPay: Array<EmployeePaymentModel>;
	printEmp = GlobalFunction.printSection;

	constructor(@Inject(MAT_DIALOG_DATA) public obj: any, private gProvider: GenericProvider, public dialogRef: MatDialogRef<EmployeePaymentDetails>) {
		//console.log("retrieve data details success... ", this.data);
		/*
		this.gProvider.getData("/payment_student/all/"+ this.data[0].studentId).subscribe(response=>{
			this.stdPay = <Array<StudentPaymentModel>>response;
			console.log("retrieve student data success: ", response);
		}, error=>{
			console.log("retrieve student data error: ", error);
		});
		*/
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

}


/*
	create payment employee component dialog
*/
@Component({
	selector: 'app-employee-paymentf',
	templateUrl: './employee-payment.html',
	styleUrls: ['../../admin.css'],
	providers: [GenericProvider]
})
export class EmployeePayment {
	PaymentForm: FormGroup;
	paym: EmployeePaymentModel;
	inst_name: string = "";

	constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private gProvider: GenericProvider, public dialogRef: MatDialogRef<EmployeePayment>) {

		this.PaymentForm = this.formBuilder.group({
			/* student form */
			paymentEmployeeValue: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(20), Validators.required])],
		});

		this.inst_name = AppSettings.INSTITUTION.institutionName + "";
		console.log("employee pay data: ", this.data);

	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	onClickSave() {
		let obj: EmployeePaymentModel = new EmployeePaymentModel();
		obj.employeeId = this.data.employeeId;
		obj.paymentEmployeeValue = this.PaymentForm.value.paymentEmployeeValue;
		obj.paymentEmployeeDetails = "";
		obj.createdBy = AppSettings.DEFAULT_USER.userUsername;
		obj.dateCreated = GlobalFunction.getCurrentDate(true);
		obj.modifiedBy = AppSettings.DEFAULT_USER.userUsername;
		obj.dateModified = GlobalFunction.getCurrentDate(true);

		this.gProvider.addObj(obj, "/payment_employee/").subscribe(response => {
			console.log("add payment data success: ", response);
			this.onNoClick();
		}, error => {
			console.log("add payment data error: ", error);
			this.onNoClick();
		});
	}

}

/*
	create historique student component dialog
*/

@Component({
	selector: 'app-emp-pay-historic',
	templateUrl: './employee-pay-historic.html',
	styleUrls: ['../../admin.css'],
	providers: [GenericProvider]
})
export class EmployeePaymentHistoric {

	stdPay: Array<EmployeePaymentModel>;
	printEmp = GlobalFunction.printSection;
	inst_name: string = "";

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, private gProvider: GenericProvider, public dialogRef: MatDialogRef<EmployeePaymentHistoric>) {
		console.log("retrieve data payment success... ", this.data);

		this.gProvider.getData("/payment_employee/all/pay/" + this.data.employeeId).subscribe(response => {
			this.stdPay = <Array<EmployeePaymentModel>>response;
			console.log("retrieve employee data success: ", response);
		}, error => {
			console.log("retrieve employee data error: ", error);
		});

		this.inst_name = AppSettings.INSTITUTION.institutionName + "";

	}

	onNoClick(): void {
		this.dialogRef.close();
	}

}