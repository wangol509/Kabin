
import { Component, ElementRef, ViewChild, Inject, Input, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { map, startWith } from 'rxjs/operators';


import { GlobalFunction } from '../../../../global/global';

import { Affaire, ClientModel, Person } from '../../../../models/models';
import { GenericProvider } from '../../../../providers/generic';
import { AppSettings } from '../../../../providers/app-settings';

import { PersonAddComponent } from '../../person/person-add/person-add.component';
//import { POINT_CONVERSION_COMPRESSED } from 'constants';

@Component({
  selector: 'app-affaire-add',
  templateUrl: './affaire-add.component.html',
  styleUrls: ['../../affaire.css']
})
export class AffaireAddComponent implements OnInit {
  AffaireForm: FormGroup;

  filteredOptions: Observable<any>;
  filteredPOptions: Observable<any>;
  filteredLOptions: Observable<any>;
  filteredAOptions: Observable<any>;

  client_options: Array<ClientModel>;
  person_adv: Array<Person>;
  lawer_adv: Array<Person>;
  lawer_for: Array<Person>;

  pHint = "";
  lHint = "";
  cHint = "";
  fHint = "";

  isUpdate = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AffaireAddComponent>,
    private gProvider: GenericProvider,
    private formBuilder: FormBuilder,
    public dialog: MatDialog) {
    this.AffaireForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      personAdvId: ['', Validators.required],
      advocatAdvId: ['', Validators.required],
      affaireQuality: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(100), Validators.required])],
      affaireJuridiction: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(100)])],
      affaireNature: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(100)])],
      affaireObject: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(200), Validators.required])],
      affaireJurDetails: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(200)])],
      affaireLawerId: ['', Validators.required],
      affaireDate: ['', Validators.required],
      affaireComment: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(200)])],
    });

    this.client_options = [];
    this.person_adv = [];
    this.lawer_adv = [];
    this.lawer_for = [];

    this.isUpdate = this.data.length != null && this.data != undefined && this.data.length > 0;

    if (!this.isUpdate) {
      console.log("affaire add call: ", this.data);

      //get all client
      this.gProvider.getData("/client/all").subscribe(data => {
        this.client_options = <Array<ClientModel>>data;
        console.log("client data: ", this.client_options);
      }, error => {
        console.log(" error getting client data: ", error);
      })

      //get all person advers
      this.gProvider.getData("/person/all/person_avd").subscribe(data => {
        this.person_adv = <Array<Person>>data;
        console.log("person avd data: ", this.person_adv);
      }, error => {
        console.log(" error getting person avd data: ", error);
      })

      //get all lawer adverse
      this.gProvider.getData("/person/all/lawer_avd").subscribe(data => {
        this.lawer_adv = <Array<Person>>data;
        console.log("lawer avd data: ", this.lawer_adv);
      }, error => {
        console.log(" error getting lawer avd data: ", error);
      });

      //get all lawer contact
      this.gProvider.getData("/person/all/lawer_for").subscribe(data => {
        this.lawer_for = <Array<Person>>data;
        console.log("lawer avd data: ", this.lawer_for);
      }, error => {
        console.log(" error getting lawer avd data: ", error);
      });
    } else {
      console.log("affaire update call:", this.data);

      let aff = this.data[0];
      let person_adv = this.data[1];
      let client = this.data[2];

      //lawer adverse
      this.gProvider.getData("/person/" + aff.advocatAdvId).subscribe(reponse => {
        let obj: any = reponse;
        let lav = <Person>obj;
        this.lHint = lav.personFirstname + " " + lav.personLastname;
      }, error => {
        console.log("error getting lawer adverse for details: ", error);
      });

      //lawer for
      this.gProvider.getData("/person/" + aff.affaireLawerId).subscribe(reponse => {
        let obj: any = reponse;
        let lav = <Person>obj;
        this.fHint = lav.personFirstname + " " + lav.personLastname;
        console.log("lawer for for details: ", this.lawer_adv);
      }, error => {
        console.log("error getting lawer for for details: ", error);
      });

      this.pHint = person_adv.personFirstname + " " + person_adv.personLastname
      //this.lHint = obj.personFirstname + " " + obj.personLastname
      this.cHint = client.clientFirstname + " " + client.clientLastname
      //this.fHint = obj.personFirstname + " " + obj.personLastname

      this.AffaireForm.patchValue(aff);
      this.AffaireForm.patchValue(person_adv);
      this.AffaireForm.patchValue(client);

    };
  }

  ngOnInit(): void {
    //filter  client
    this.filteredOptions = this.AffaireForm.get("clientId").valueChanges
      .startWith(null)
      .map(term => this.findOption(term, "client"));

    //filter person adv
    this.filteredLOptions = this.AffaireForm.get("advocatAdvId").valueChanges
      .startWith(null)
      .map(term => this.findOption(term, "ladv"));

    //filter lwaer adv
    this.filteredPOptions = this.AffaireForm.get("personAdvId").valueChanges
      .startWith(null)
      .map(term => this.findOption(term, "padv"));

    //filter lwaer for
    this.filteredAOptions = this.AffaireForm.get("affaireLawerId").valueChanges
      .startWith(null)
      .map(term => this.findOption(term, "afor"));
  }

  setHintValue(obj: any, param) {
    if (param == "padv") {
      this.pHint = obj.personFirstname + " " + obj.personLastname
    } else if (param == "ladv") {
      this.lHint = obj.personFirstname + " " + obj.personLastname
    } else if (param == "client") {
      this.cHint = obj.clientFirstname + " " + obj.clientLastname
    } else if (param == "fadv") {
      this.fHint = obj.personFirstname + " " + obj.personLastname
    }
  }

  findOption(val: string, type: string) {
    if (type == "padv") {
      return this.person_adv.filter((s) => new RegExp(val, 'gi').test(s.personCardId + s.personFirstname + s.personLastname));
    } else if (type == "ladv") {
      return this.lawer_adv.filter((s) => new RegExp(val, 'gi').test(s.personCardId + s.personFirstname + s.personLastname));
    } else if (type == "client") {
      return this.client_options.filter((s) => new RegExp(val, 'gi').test(s.clientId + s.clientFirstname + s.clientLastname));
    } else if (type == "afor") {
      return this.lawer_for.filter((s) => new RegExp(val, 'gi').test(s.personCardId + s.personFirstname + s.personLastname));
    }
  }

  addPerson(type: string) {

    let dialogRef = this.dialog.open(PersonAddComponent, {
      width: '650px',
      height: '450px',
      data: type
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("close person data: ", dialogRef.componentInstance.person);

      let person = dialogRef.componentInstance.person;

      if (person != null && person != undefined) {
        if ("person_avd" == type) {
          this.AffaireForm.patchValue({ "personAdvId": person.personId });
          this.pHint = person.personFirstname + " " + person.personLastname
        } else if ("lawer_avd" == type) {
          this.AffaireForm.patchValue({ "advocatAdvId": person.personId });
          this.lHint = person.personFirstname + " " + person.personLastname
        } else if ("lawer_for" == type) {
          this.AffaireForm.patchValue({ "affaireLawerId": person.personId });
          this.fHint = person.personFirstname + " " + person.personLastname
        }
      } else {
        console.log("null value person dialog")
      }
    });
  }

  validateAffaire(): void {
    let aff: Affaire = new Affaire();
    aff = <Affaire>this.AffaireForm.value;
    aff.createdBy = AppSettings.DEFAULT_USER.userUsername;
    aff.affaireDate = new Date(Date.parse(this.AffaireForm.value.affaireDate)).toISOString().split("T")[0];
    aff.dateCreated = GlobalFunction.getCurrentDate(false);

    if (!this.isUpdate) {
      console.log("affaire value to add: ", aff);

      this.gProvider.add(aff, "/affaire").subscribe(data => {
        console.log(" adding affaire  success: ", data);
        this.AffaireForm.reset();
        GlobalFunction.showMsgSuccess();
      }, error => {
        GlobalFunction.showMsgError();
        console.log(" adding affaire error: ", error);
      });
    } else {
      console.log("affaire value to update: ", aff);
      aff.affaireId = this.data[0].affaireId;
      aff.modifiedBy = AppSettings.DEFAULT_USER.userUsername;
      aff.dateModified = GlobalFunction.getCurrentDate(false);

      this.gProvider.update(aff, "/affaire").subscribe(data => {
        console.log(" update affaire  success: ", data);
        this.AffaireForm.reset();
        GlobalFunction.showMsgSuccess();
      }, error => {
        GlobalFunction.showMsgError();
        console.log(" update affaire error: ", error);
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

