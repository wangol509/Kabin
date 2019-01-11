

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

import { EmployeeUpdateComponent } from '../employee-update/employee-update.component';
import { window } from 'rxjs/operator/window';

@Component({
  selector: 'employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {

  displayedColumns = ['Code', 'Nom', 'Prenom', 'Fonction', 'Email', 'Tels', "Sex", "Details", "Update"];
  exampleDatabase = new EmployeeDatabase(this.gProvider);
  dataSource: EmployeeDataSource | null;
  SmallSForm: FormGroup;
  etype = "Professeur";

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
      employeeDetails: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(200)])],
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
    this.exampleDatabase = new EmployeeDatabase(this.gProvider);
    this.dataSource = new EmployeeDataSource(this.exampleDatabase);
  }

  ngOnInit() {
    this.dataSource = new EmployeeDataSource(this.exampleDatabase);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
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
    emp.employeeBirthday = this.SmallSForm.value.employeeBirthday;
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
    this.gProvider.add(sAddr, "/address").subscribe(data => {
      emp.addressId = parseInt(data.toString());
      console.log(" on go add employee: ", emp);
      this.gProvider.add(emp, "/employee").subscribe(data => {
        console.log(" adding employee  success: ", data);
        ems.employeeId = parseInt(data.toString());
        this.gProvider.add(ems, "/employee_salary").subscribe(data => {
          console.log("adding employee salary success: ", data);
        }, error => {
          console.log("adding employee salary error: ", error);
        });
      }, error => {
        console.log(" adding employee error: ", error);
      });
    }, error => {
      console.log(" error adding address fo employee small staff: ", error);
    });
  }


  openDetailsDialog(param): void {
    let data: any = new Object();
    Observable.forkJoin(this.gProvider.getData("/address/" + param.addressId), this.gProvider.getData("/employee_salary/all/" + param.employeeId)).subscribe(response => {

      data.emp = param;
      data.addr = response[0];
      data.empsal = response[1];

      console.log(" data == ", data);

      let dialogRef = this.dialog.open(EmployeeDetails, {
        width: '850px',
        height: '650px',
        data: data
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.fetchData();
      });
    });
  }

  openUpdateDialog(param): void {
    let data: any = new Object();

    Observable.forkJoin(this.gProvider.getData("/address/" + param.addressId), this.gProvider.getData("/employee_salary/all/" + param.employeeId)).subscribe(response => {

      data.emp = param;
      data.addr = response[0];
      data.empsal = response[1];

      let dialogRef = this.dialog.open(EmployeeUpdateComponent, {
        width: '850px',
        height: '750px',
        data: data
      });


      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.fetchData();
      });
    });
  }

}

export class EmployeeDatabase {

  dataChange: BehaviorSubject<EmployeeModel[]> = new BehaviorSubject<EmployeeModel[]>([]);

  get data(): EmployeeModel[] {
    return this.dataChange.value;
  }

  constructor(private gProvider: GenericProvider) {
    let etype = localStorage.getItem("EMPLOYEE_TYPE");

    console.log("Storage employee type: ", etype);

    this.gProvider.getData("/employee/all/" + etype).subscribe(data => {
      console.log("data employee: ", data);
      this.dataChange.next(<Array<EmployeeModel>>data);
    }, error => {
      console.log("data error: ", error);
    })
  }
}

export class EmployeeDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private _exampleDatabase: EmployeeDatabase) {
    super();
  }

  connect(): Observable<EmployeeModel[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._filterChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this._exampleDatabase.data.slice().filter((item: EmployeeModel) => {
        let searchStr = (item.employeeFirstname + item.employeeLastname + item.employeeCardId).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });
    });
  }

  disconnect() { }
}

@Component({
  selector: 'employee-details',
  templateUrl: './employee.details.html',
  styleUrls: ['../../admin.css'],
  providers: [GenericProvider]
})
export class EmployeeDetails {
  emp: EmployeeModel;
  adr: AddressModel;
  employeSalary: EmployeeSalaryModel;
  etype = "Employe";
  iname: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EmployeeDetails>, public formBuilder: FormBuilder, private gProvider: GenericProvider) {
    this.emp = this.data.emp;
    this.adr = this.data.addr;
    this.employeSalary = this.data.empsal;

    console.log(" test addr: ", this.adr);
    this.iname = AppSettings.INSTITUTION.institutionName + "";
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  printTch(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title> Institution ${this.iname}</title>
          <style>

          .iheader{
            background: #ddd;
            padding: 10px;
            margin-bottom: 20px;
          }
        
          .lab{
            padding: 10px 4px;
          }

          .lab label{
            color: #555;
          }

          table td, table td * {
              vertical-align: top;
          } 
          
          .tdd{
            border-left: solid 1px #eee;
          }
		</style>
        </head>
       <body onload="window.print();window.close()">
          <br/> <br/>
          <p> Information sur le professeur ${this.emp.employeeFirstname + " " + this.emp.employeeLastname}
          ${printContents}
        </body>

        <footer>
        <br/><br/>
        <br/><br/>
        <br/><br/>
        <hr>
        La Direction
        </footer>
      </html>`
    );
    popupWin.document.close();
  }

}
