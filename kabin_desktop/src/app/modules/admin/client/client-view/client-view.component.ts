

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

import { ClientModel, AddressModel } from '../../../../models/models';
import { GenericProvider } from '../../../../providers/generic';
import { AppSettings } from '../../../../providers/app-settings';

import { ClientUpdateComponent } from '../client-update/client-update.component';
import { window } from 'rxjs/operator/window';

@Component({
  selector: 'client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.css']
})
export class ClientViewComponent implements OnInit {

  displayedColumns = ['Code', 'Nom', 'Prenom', 'Fonction', 'Email', 'Tels', "Sex", "Details", "Update"];
  exampleDatabase = new ClientDatabase(this.gProvider);
  dataSource: ClientDataSource | null;
  SmallSForm: FormGroup;
  etype = "Professeur";

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
      clientDetails: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(200)])],
      clientBirthday: ['', Validators.required],

      sAddressCountry: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(50), Validators.required])],
      sAddressState: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(50), Validators.required])],
      sAddressCity: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(50), Validators.required])],
      sAddressStreet: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(50), Validators.required])],
      sAddressDetails: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(100)])],

      clientSalaryValue: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(20), Validators.required])],
      clientSalaryPaymentFreq: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(4), Validators.required])],
    });
  }

  fetchData(): void {
    this.exampleDatabase = new ClientDatabase(this.gProvider);
    this.dataSource = new ClientDataSource(this.exampleDatabase);
  }

  ngOnInit() {
    this.dataSource = new ClientDataSource(this.exampleDatabase);
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
    emp.clientBirthday = this.SmallSForm.value.clientBirthday;
    emp.clientSex = this.SmallSForm.value.clientSex;
    emp.clientTels = this.SmallSForm.value.clientTels;
    emp.clientEmail = this.SmallSForm.value.clientEmail
    emp.clientActive = true;
    emp.createdBy = AppSettings.DEFAULT_USER.userUsername;
    emp.dateCreated = GlobalFunction.getCurrentDate(true);
    emp.modifiedBy = " ";
    emp.dateModified = GlobalFunction.getCurrentDate(true);

    /* insert addr, client, salary */
    this.gProvider.add(sAddr, "/address").subscribe(data => {
      emp.addressId = parseInt(data.toString());
      console.log(" on go add client: ", emp);
      this.gProvider.add(emp, "/client").subscribe(data => {
        console.log(" adding client  success: ", data);
      }, error => {
        console.log(" adding client error: ", error);
      });
    }, error => {
      console.log(" error adding address fo client small staff: ", error);
    });
  }


  openDetailsDialog(param): void {
    let data: any = new Object();

    this.gProvider.getData("/address/" + param.addressId).subscribe(response => {
      data.emp = param;
      data.addr = response;

      console.log(" data == ", data);

      let dialogRef = this.dialog.open(ClientDetails, {
        width: '850px',
        height: '650px',
        data: data
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.fetchData();
      });
    }, error => {
      console.log("error get clients: ", error);
    })

  }

  openUpdateDialog(param): void {
    let data: any = new Object();

    this.gProvider.getData("/address/" + param.addressId).subscribe(response => {
      data.emp = param;
      data.addr = response;

      console.log(" data == ", data);

      let dialogRef = this.dialog.open(ClientUpdateComponent, {
        width: '850px',
        height: '650px',
        data: data
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.fetchData();
      });
    }, error => {
      console.log("error get clients: ", error);
    })
  }

}

export class ClientDatabase {

  dataChange: BehaviorSubject<ClientModel[]> = new BehaviorSubject<ClientModel[]>([]);

  get data(): ClientModel[] {
    return this.dataChange.value;
  }

  constructor(private gProvider: GenericProvider) {

    this.gProvider.getData("/client/all/").subscribe(data => {
      console.log("data client: ", data);
      this.dataChange.next(<Array<ClientModel>>data);
    }, error => {
      console.log("data error: ", error);
    })
  }
}

export class ClientDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private _exampleDatabase: ClientDatabase) {
    super();
  }

  connect(): Observable<ClientModel[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._filterChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this._exampleDatabase.data.slice().filter((item: ClientModel) => {
        let searchStr = (item.clientFirstname + item.clientLastname + item.clientCardId).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });
    });
  }

  disconnect() { }
}

@Component({
  selector: 'client-details',
  templateUrl: './client.details.html',
  styleUrls: ['../../admin.css'],
  providers: [GenericProvider]
})
export class ClientDetails {
  emp: ClientModel;
  adr: AddressModel;
  etype = "Professeur";
  iname: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ClientDetails>, public formBuilder: FormBuilder, private gProvider: GenericProvider) {
    this.emp = this.data.emp;
    this.adr = this.data.addr;

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
          <p> Information sur le professeur ${this.emp.clientFirstname + " " + this.emp.clientLastname}
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
