
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

import { Audience, Affaire } from '../../../../models/models';
import { GenericProvider } from '../../../../providers/generic';
import { AppSettings } from '../../../../providers/app-settings';

import { AudienceAddComponent } from '../audience-add/audience-add.component';


@Component({
  selector: 'app-audience-view',
  templateUrl: './audience-view.component.html',
  styleUrls: ['./audience-view.component.css']
})
export class AudienceViewComponent implements OnInit {
  displayedColumns = ['Code', 'Description', 'Affaire', 'Date', "Details", "Update"];
  audDatabase = new AudienceDatabase(this.gProvider);
  dataSource: AudienceDataSource | null;

  @ViewChild('filter') filter: ElementRef;

  constructor(private gProvider: GenericProvider, public dialog: MatDialog) {

  }

  fetchData(): void {
    this.audDatabase = new AudienceDatabase(this.gProvider);
    this.dataSource = new AudienceDataSource(this.audDatabase);
  }

  ngOnInit() {
    this.dataSource = new AudienceDataSource(this.audDatabase);
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
    data.aud = param[0];
    data.aff = param[1];

    let dialogRef = this.dialog.open(AudienceDetails, {
      width: '850px',
      height: '650px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The audience dialog was closed');
      this.fetchData();
    });
  }

  openUpdateDialog(param): void {

    let dialogRef = this.dialog.open(AudienceAddComponent, {
      width: '950px',
      height: '750px',
      data: param
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The audience dialog was closed');
      this.fetchData();
    });
  }
}

export class AudienceDatabase {

  dataChange: BehaviorSubject<Audience[]> = new BehaviorSubject<Audience[]>([]);

  get data(): Audience[] {
    return this.dataChange.value;
  }

  constructor(private gProvider: GenericProvider) {

    this.gProvider.getData("/audience/big_query1").subscribe(data => {
      console.log("data audience: ", data);
      this.dataChange.next(<Array<Audience>>data);
    }, error => {
      console.log("data error: ", error);
    })
  }
}

export class AudienceDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private _Database: AudienceDatabase) {
    super();
  }

  connect(): Observable<Audience[]> {
    const displayDataChanges = [
      this._Database.dataChange,
      this._filterChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this._Database.data.slice().filter((item: Audience) => {
        let searchStr = (item[0].audienceDetails + item[0].dateCreated + item[1].affaireId + "").toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });
    });
  }

  disconnect() { }
}

@Component({
  selector: 'audience-details',
  templateUrl: './audience-details.html',
  styleUrls: ['../../affaire.css'],
  providers: [GenericProvider]
})
export class AudienceDetails {
  aud: Audience;
  aff: Audience;

  iname = "";


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AudienceDetails>, public formBuilder: FormBuilder, private gProvider: GenericProvider) {
    this.iname = AppSettings.INSTITUTION.institutionName + "";

    this.aff = this.data.aff;
    this.aud = this.data.aud;

    console.log("data found for details audience: ", this.data);

    // if(this.aff != null && this.aff != undefined){
    //   //lawer adverse
    //   this.gProvider.getData("/person/" + this.aff.advocatAdvId).subscribe(data=>{
    //     let obj: any = data;
    //     this.lawer_adv = <Person>obj;
    //     console.log("lawer adverse for details: ", this.lawer_adv);
    //   }, error=>{
    //     console.log("error getting lawer adverse for details: ", error);
    //   });

    //   //lawer for
    //   this.gProvider.getData("/person/" + this.aff.audienceLawerId).subscribe(data=>{
    //     let obj: any = data;
    //     this.lawer_for = <Person>obj;
    //     console.log("lawer for for details: ", this.lawer_adv);
    //   }, error=>{
    //     console.log("error getting lawer for for details: ", error);
    //   });
    // }else{
    //   console.log("can't find all data for details audience: ");
    // }
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
