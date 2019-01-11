
/*
	when adding a person, we must specify his type
	the type can be one these values: {person_avd, lawer_avd}

	person_avd: person adverse
	lawer_avd: lawer adverse
*/


import { Component, ElementRef, ViewChild, Inject, Input, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GlobalFunction } from '../../../../global/global';

import { Person } from '../../../../models/models';
import { GenericProvider } from '../../../../providers/generic';
import { AppSettings } from '../../../../providers/app-settings';

@Component({
	selector: 'person-add',
	templateUrl: './person-add.component.html',
	styleUrls: ['../../affaire.css']
})
export class PersonAddComponent implements OnInit {

	SmallSForm: FormGroup;
	person: Person;
	@ViewChild('filter') filter: ElementRef;

	type = "";
	_title = ""

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<PersonAddComponent>, private gProvider: GenericProvider, private formBuilder: FormBuilder, public dialog: MatDialog) {
		this.SmallSForm = this.formBuilder.group({
			personFirstname: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(40), Validators.required])],
			personLastname: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(40), Validators.required])],
			personCardId: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(20)])],
			personSex: ['', Validators.compose([Validators.required])],
			personTels: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(20), Validators.required])],
			personEmail: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(62), Validators.required])],
			personDetails: ['', Validators.compose([Validators.maxLength(200)])],
			//personBirthday: ['', Validators.required],
		});

		this.type = this.data;

		if (this.type == "person_avd") {
			this._title = "Personne Contre"
		} else if (this.type == "lawer_avd") {
			this._title = "Avocat Contre";
		} else if (this.type == "lawer_for") {
			this._title = "Avocat sur le dossier";
		}
	}


	ngOnInit() {

	}

	closeWnd() {
		this.dialogRef.close();
	}

	validatePerson(): void {
		this.person = new Person();
		this.person.personFirstname = this.SmallSForm.value.personFirstname;
		this.person.personLastname = this.SmallSForm.value.personLastname;
		this.person.personCardId = this.SmallSForm.value.personCardId;
		this.person.personType = this.type;
		this.person.personDetails = this.SmallSForm.value.personDetails;
		this.person.personBirthday = null;
		this.person.personSex = this.SmallSForm.value.personSex;
		this.person.personTels = this.SmallSForm.value.personTels;
		this.person.personEmail = this.SmallSForm.value.personEmail
		this.person.createdBy = AppSettings.DEFAULT_USER.userUsername;
		this.person.dateCreated = GlobalFunction.getCurrentDate(false);
		this.person.modifiedBy = " ";
		this.person.dateModified = GlobalFunction.getCurrentDate(false);

		this.gProvider.add(this.person, "/person").subscribe(data => {
			console.log(" adding person  success: ", data);
			this.person.personId = parseInt(data + "");

			setTimeout(() => {
				this.closeWnd();
			}, 1000);

			GlobalFunction.showMsgSuccess();
		}, error => {
			this.person = null;

			setTimeout(() => {
				this.closeWnd();
			}, 1000);

			GlobalFunction.showMsgError();
			console.log(" adding person error: ", error);
		});
	}
}
