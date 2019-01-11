
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


@Component({
  selector: 'client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['../../admin.css']
})
export class ClientUpdateComponent {
  addr: AddressModel;
  emp: ClientModel;
  ClientForm: FormGroup;
  etype = "Client";

  constructor(private gProvider: GenericProvider, public dialogRef: MatDialogRef<ClientUpdateComponent>, public formBuilder: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private data: any) {
    console.clear();

    this.emp = this.data.emp;
    this.addr = this.data.addr;
    console.log("data: ", this.data);

    this.ClientForm = this.formBuilder.group({
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
    });

    this.initForm();
  }


  closeWindow(): void {
    this.dialogRef.close();
  }

  validateClient(): void {
    /* client ref addr */
    let sAddr = new AddressModel();
    sAddr.addressId = this.addr.addressId;
    sAddr.addressCountry = this.ClientForm.value.sAddressCountry;
    sAddr.addressState = this.ClientForm.value.sAddressState;
    sAddr.addressCity = this.ClientForm.value.sAddressCity;
    sAddr.addressStreet = this.ClientForm.value.sAddressStreet;
    sAddr.addressDetails = this.ClientForm.value.sAddressDetails;
    sAddr.createdBy = this.addr.dateCreated;
    sAddr.dateCreated = GlobalFunction.getCurrentDate(true);
    sAddr.modifiedBy = AppSettings.DEFAULT_USER.userUsername;
    sAddr.dateModified = GlobalFunction.getCurrentDate(true);

    let emp: ClientModel = new ClientModel();
    emp.clientId = this.emp.clientId;
    emp.clientFirstname = this.ClientForm.value.clientFirstname;
    emp.clientLastname = this.ClientForm.value.clientLastname;
    emp.clientFunction = this.ClientForm.value.clientFunction;
    emp.clientCardId = this.ClientForm.value.clientCardId;
    emp.clientType = "client";
    emp.clientDetails = this.ClientForm.value.clientDetails;
    emp.clientBirthday = new Date(Date.parse(this.ClientForm.value.clientBirthday)).toISOString().split("T")[0];
    emp.clientSex = this.ClientForm.value.clientSex;
    emp.clientTels = this.ClientForm.value.clientTels;
    emp.clientEmail = this.ClientForm.value.clientEmail
    emp.clientActive = true;
    emp.createdBy = this.emp.dateCreated;
    emp.dateCreated = GlobalFunction.getCurrentDate(true);
    emp.modifiedBy = AppSettings.DEFAULT_USER.userUsername;
    emp.dateModified = GlobalFunction.getCurrentDate(true);

    /* insert addr, client, salary */
    this.gProvider.update(sAddr, "/address").subscribe(data => {

      console.log(" update address success : ", this.addr);
      emp.addressId = this.addr.addressId;

      this.gProvider.update(emp, "/client").subscribe(data => {
        console.log(" update client  success: ", data);
      }, error => {
        console.log(" update client error: ", error);
      });
    }, error => {
      console.log(" error update address fo client client: ", error);
    });
  }


  initForm(): void {
    this.ClientForm.patchValue({
      "clientFirstname": this.emp.clientFirstname,
      "clientLastname": this.emp.clientLastname,
      "clientFunction": this.emp.clientFunction,
      "clientCardId": this.emp.clientCardId,
      "clientBirthday": this.emp.clientBirthday,
      "clientSex": this.emp.clientSex,
      "clientTels": this.emp.clientTels,
      "clientEmail": this.emp.clientEmail,
      "clientDetails": this.emp.clientDetails,
      "sAddressCountry": this.addr.addressCountry,
      "sAddressState": this.addr.addressState,
      "sAddressCity": this.addr.addressCity,
      "sAddressStreet": this.addr.addressStreet,
      "sAddressDetails": this.addr.addressDetails,
    });
  }
}

