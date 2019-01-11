
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

import { Person, AddressModel } from '../../../../models/models';
import { GenericProvider } from '../../../../providers/generic';
import { AppSettings } from '../../../../providers/app-settings';


@Component({
  selector: 'person-update',
  templateUrl: './person-update.component.html',
  styleUrls: ['../../affaire.css']
})
export class PersonUpdateComponent {
  addr: AddressModel;
  per: Person;
  PersonForm: FormGroup;
  etype = "Professeur";

  constructor(private gProvider: GenericProvider, public dialogRef: MatDialogRef<PersonUpdateComponent>, public formBuilder: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private data: any) {
    console.clear();

    this.per = this.data.per;
    this.addr = this.data.addr;

    console.log("data: ", this.data);

    this.PersonForm = this.formBuilder.group({
      personFirstname: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(40), Validators.required])],
      personLastname: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(40), Validators.required])],
      personFunction: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(100), Validators.required])],
      personCardId: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(20)])],
      personSex: ['', Validators.compose([Validators.required])],
      personTels: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(20), Validators.required])],
      personEmail: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(62), Validators.required])],
      personDetails: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(200)])],
      personBirthday: ['', Validators.required],
    });

    this.initForm();
  }


  closeWindow(): void {
    this.dialogRef.close();
  }

  validatePerson(): void {
    let per: Person = new Person();
    per.personId = this.per.personId;
    per.personFirstname = this.PersonForm.value.personFirstname;
    per.personLastname = this.PersonForm.value.personLastname;
    per.personCardId = this.PersonForm.value.personCardId;
    per.personType = "teacher";
    per.personDetails = this.PersonForm.value.personDetails;
    per.personBirthday = new Date(Date.parse(this.PersonForm.value.personBirthday)).toISOString().split("T")[0];
    per.personSex = this.PersonForm.value.personSex;
    per.personTels = this.PersonForm.value.personTels;
    per.personEmail = this.PersonForm.value.personEmail
    per.createdBy = this.per.dateCreated;
    per.dateCreated = GlobalFunction.getCurrentDate(true);
    per.modifiedBy = AppSettings.DEFAULT_USER.userUsername;
    per.dateModified = GlobalFunction.getCurrentDate(true);

    this.gProvider.update(per, "/person").subscribe(data => {
      console.log(" update person  success: ", data);
    }, error => {
      console.log(" update person error: ", error);
    });
  }


  initForm(): void {
    this.PersonForm.patchValue({
      "personFirstname": this.per.personFirstname,
      "personLastname": this.per.personLastname,
      "personCardId": this.per.personCardId,
      "personBirthday": this.per.personBirthday,
      "personSex": this.per.personSex,
      "personTels": this.per.personTels,
      "personEmail": this.per.personEmail,
      "personDetails": this.per.personDetails,
    });
  }
}

