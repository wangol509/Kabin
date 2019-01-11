
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

import { Affaire, ClientModel, Person } from '../../../../models/models';
import { GenericProvider } from '../../../../providers/generic';
import { AppSettings } from '../../../../providers/app-settings';

import { AffaireAddComponent } from '../affaire-add/affaire-add.component';

@Component({
  selector: 'app-affaire-view',
  templateUrl: './affaire-view.component.html',
  styleUrls: ['./affaire-view.component.css']
})
export class AffaireViewComponent implements OnInit {
  displayedColumns = ['Code', 'Affaire', 'Client', 'Date', "Details", "Update"];
  affDatabase = new AffaireDatabase(this.gProvider);
  dataSource: AffaireDataSource | null;
  etype = "Professeur";

  @ViewChild('filter') filter: ElementRef;

  constructor(private gProvider: GenericProvider, private formBuilder: FormBuilder, public dialog: MatDialog) {

  }

  fetchData(): void {
    this.affDatabase = new AffaireDatabase(this.gProvider);
    this.dataSource = new AffaireDataSource(this.affDatabase);
  }

  ngOnInit() {
    this.dataSource = new AffaireDataSource(this.affDatabase);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }


  openDetailsDialog(param): void {
    let data: any = {};
    data.aff = param[0];
    data.person_adv = param[1];
    data.client = param[2];

    let dialogRef = this.dialog.open(AffaireDetails, {
      width: '850px',
      height: '650px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The affaire dialog was closed');
      this.fetchData();
    });
  }

  openUpdateDialog(param): void {

    let dialogRef = this.dialog.open(AffaireAddComponent, {
      width: '950px',
      height: '750px',
      data: param
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The affaire dialog was closed');
      this.fetchData();
    });
  }
}

export class AffaireDatabase {

  dataChange: BehaviorSubject<Affaire[]> = new BehaviorSubject<Affaire[]>([]);

  get data(): Affaire[] {
    return this.dataChange.value;
  }

  constructor(private gProvider: GenericProvider) {

    this.gProvider.getData("/affaire/big_query").subscribe(data => {
      console.log("data affaire: ", data);
      this.dataChange.next(<Array<Affaire>>data);
    }, error => {
      console.log("data error: ", error);
    })
  }
}

export class AffaireDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private _Database: AffaireDatabase) {
    super();
  }

  connect(): Observable<Affaire[]> {
    const displayDataChanges = [
      this._Database.dataChange,
      this._filterChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this._Database.data.slice().filter((item: Affaire) => {
        let searchStr = (item[0].affaireObject + item[0].dateCreated + item[2].clientLastname + item[2].clientFirstname).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });
    });
  }

  disconnect() { }
}

@Component({
  selector: 'affaire-details',
  templateUrl: './affaire-details.html',
  styleUrls: ['../../affaire.css'],
  providers: [GenericProvider]
})
export class AffaireDetails {
  aff: Affaire;
  client: ClientModel;
  person_adv: Person;
  lawer_for: Person;
  lawer_adv: Person;

  iname = "";


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AffaireDetails>, public formBuilder: FormBuilder, private gProvider: GenericProvider) {
    this.iname = AppSettings.INSTITUTION.institutionName + "";

    this.aff = this.data.aff;
    this.person_adv = this.data.person_adv;
    this.client = this.data.client;

    console.log("data found for details affaire: ", this.data);

    if (this.aff != null && this.aff != undefined) {
      //lawer adverse
      this.gProvider.getData("/person/" + this.aff.advocatAdvId).subscribe(data => {
        let obj: any = data;
        this.lawer_adv = <Person>obj;
        console.log("lawer adverse for details: ", this.lawer_adv);
      }, error => {
        console.log("error getting lawer adverse for details: ", error);
      });

      //lawer for
      this.gProvider.getData("/person/" + this.aff.affaireLawerId).subscribe(data => {
        let obj: any = data;
        this.lawer_for = <Person>obj;
        console.log("lawer for for details: ", this.lawer_adv);
      }, error => {
        console.log("error getting lawer for for details: ", error);
      });
    } else {
      console.log("can't find all data for details affaire: ");
    }
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
  
        </body>

        <footer>

        <hr>
        La Direction
        </footer>
      </html>`
    );
    popupWin.document.close();
  }

}
