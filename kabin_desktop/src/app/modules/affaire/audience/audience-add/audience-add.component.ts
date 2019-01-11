
import { Component, ElementRef, ViewChild, Inject, Input, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { map, startWith } from 'rxjs/operators';


import { GlobalFunction } from '../../../../global/global';

import { Audience, ClientModel, Person } from '../../../../models/models';
import { GenericProvider } from '../../../../providers/generic';
import { AppSettings } from '../../../../providers/app-settings';

import { PersonAddComponent } from '../../person/person-add/person-add.component';
//import { POINT_CONVERSION_COMPRESSED } from 'constants';

@Component({
  selector: 'app-audience-add',
  templateUrl: './audience-add.component.html',
  styleUrls: ['../../affaire.css']
})
export class AudienceAddComponent implements OnInit {
  AudienceForm: FormGroup;

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
    public dialogRef: MatDialogRef<AudienceAddComponent>,
    private gProvider: GenericProvider,
    private formBuilder: FormBuilder,
    public dialog: MatDialog) {
    this.AudienceForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      personAdvId: ['', Validators.required],
      advocatAdvId: ['', Validators.required],
      audienceQuality: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(100), Validators.required])],
      audienceJuridiction: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(100)])],
      audienceNature: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(100)])],
      audienceObject: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(200), Validators.required])],
      audienceJurDetails: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(200)])],
      audienceLawerId: ['', Validators.required],
      audienceDate: ['', Validators.required],
      audienceComment: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(200)])],
    });

    this.client_options = [];
    this.person_adv = [];
    this.lawer_adv = [];
    this.lawer_for = [];

    this.isUpdate = this.data.length != null && this.data != undefined && this.data.length > 0;

    if (!this.isUpdate) {
      console.log("audience add call: ", this.data);

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
      console.log("audience update call:", this.data);

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
      this.gProvider.getData("/person/" + aff.audienceLawerId).subscribe(reponse => {
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

      this.AudienceForm.patchValue(aff);
      this.AudienceForm.patchValue(person_adv);
      this.AudienceForm.patchValue(client);

    };
  }

  ngOnInit(): void {
    //filter  client
    this.filteredOptions = this.AudienceForm.get("clientId").valueChanges
      .startWith(null)
      .map(term => this.findOption(term, "client"));

    //filter person adv
    this.filteredLOptions = this.AudienceForm.get("advocatAdvId").valueChanges
      .startWith(null)
      .map(term => this.findOption(term, "ladv"));

    //filter lwaer adv
    this.filteredPOptions = this.AudienceForm.get("personAdvId").valueChanges
      .startWith(null)
      .map(term => this.findOption(term, "padv"));

    //filter lwaer for
    this.filteredAOptions = this.AudienceForm.get("audienceLawerId").valueChanges
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
          this.AudienceForm.patchValue({ "personAdvId": person.personId });
          this.pHint = person.personFirstname + " " + person.personLastname
        } else if ("lawer_avd" == type) {
          this.AudienceForm.patchValue({ "advocatAdvId": person.personId });
          this.lHint = person.personFirstname + " " + person.personLastname
        } else if ("lawer_for" == type) {
          this.AudienceForm.patchValue({ "audienceLawerId": person.personId });
          this.fHint = person.personFirstname + " " + person.personLastname
        }
      } else {
        console.log("null value person dialog")
      }
    });
  }

  validateAudience(): void {
    let aff: Audience = new Audience();
    aff = <Audience>this.AudienceForm.value;
    aff.createdBy = AppSettings.DEFAULT_USER.userUsername;
    aff.audienceDate = new Date(Date.parse(this.AudienceForm.value.audienceDate)).toISOString().split("T")[0];
    aff.dateCreated = GlobalFunction.getCurrentDate(false);

    if (!this.isUpdate) {
      console.log("audience value to add: ", aff);

      this.gProvider.add(aff, "/audience").subscribe(data => {
        console.log(" adding audience  success: ", data);
        this.AudienceForm.reset();
        GlobalFunction.showMsgSuccess();
      }, error => {
        GlobalFunction.showMsgError();
        console.log(" adding audience error: ", error);
      });
    } else {
      console.log("audience value to update: ", aff);
      aff.audienceId = this.data[0].audienceId;
      aff.modifiedBy = AppSettings.DEFAULT_USER.userUsername;
      aff.dateModified = GlobalFunction.getCurrentDate(false);

      this.gProvider.update(aff, "/audience").subscribe(data => {
        console.log(" update audience  success: ", data);
        this.AudienceForm.reset();
        GlobalFunction.showMsgSuccess();
      }, error => {
        GlobalFunction.showMsgError();
        console.log(" update audience error: ", error);
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

