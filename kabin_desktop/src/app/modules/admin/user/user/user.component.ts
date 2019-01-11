

import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GenericProvider } from '../../../../providers/generic';
import { AppSettings } from '../../../../providers/app-settings';
import { GlobalFunction } from '../../../../global/global';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UserModel } from '../../../../models/models';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	users: Array<UserModel>;
	defaultUser: UserModel;
	eUser = new UserModel("", 0, "", "", "", "", "", "", "", "", "", "", "", false, "", "", "", "");

	constructor(private gProvider: GenericProvider, public dialog: MatDialog) {
		this.defaultUser = AppSettings.DEFAULT_USER;
		this.eUser.userImg = this.defaultUser.userImg;
		this.users = [];
		this.users.push(AppSettings.DEFAULT_USER);
		this.fetchData();


	}

	fetchData(): void {
		this.gProvider.getData("/user/all/active/true").subscribe(data => {
			console.log("class found: ", data);
			this.users = <Array<UserModel>>data;
		}, error => {

		});
	}

	ngOnInit() {

	}

	openDialog(data, param, w, h): void {
		data.param = param;

		if ("Update" == param) {
			alert("Attention ! Si vous modifier un utilisateur, vous devez modifier son mot de passe aussi.");
		}

		let dialogRef = this.dialog.open(DialogUserUpdateDialog, {
			width: w,
			height: h,
			data: data
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			this.fetchData();
		});
	}

}

@Component({
	selector: 'user-update-dialog',
	templateUrl: 'user-update.component.html',
	styleUrls: ['./user.component.css'],
	providers: [GenericProvider]
})
export class DialogUserUpdateDialog {

	user: UserModel;

	UserForm: FormGroup;
	isDelete: boolean;
	isDetails: boolean;

	constructor(public dialogRef: MatDialogRef<DialogUserUpdateDialog>, private router: Router, private formBuilder: FormBuilder, private gProvider: GenericProvider, @Inject(MAT_DIALOG_DATA) public data: any) {

		this.isDelete = (this.data.param == "Delete" || this.data.param == "Details");
		this.isDetails = this.data.param == "Details";
		this.user = <UserModel>this.data;
		this.user.userImg = AppSettings.DEFAULT_USER.userImg;

		this.UserForm = this.formBuilder.group({
			/* user form */
			userFirstname: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(40), Validators.required])],
			userLastname: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(40), Validators.required])],
			userUsername: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(40), Validators.required])],
			userPassword: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(40), Validators.required])],
			userSex: ['', Validators.compose([Validators.required])],
			userPhone: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(20), Validators.required])],
			userEmail: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(20), Validators.required])],
			userPrivilege: ['', Validators.compose([Validators.required])],
		});

		if (this.data.param == "Update" || this.isDelete) {
			console.log("Data User: ", this.data);
			this.UserForm.patchValue({ "userFirstname": this.data.userFirstname, "userLastname": this.data.userLastname, "userSex": this.data.userSex, "userPhone": this.data.userPhone, "userEmail": this.data.userEmail, "userUsername": this.data.userUsername, "userPassword": this.data.userPassword, "userPrivilege": this.data.userPrivilege + "" });
		} else if (this.data.param == "Add") {
			this.UserForm.setValue({ "userFirstname": "", "userLastname": "", "userSex": "", "userPhone": "", "userEmail": "", "userUsername": "", "userPassword": "", "userPrivilege": "" });
		} else if (this.data.param == "Details") {
			this.UserForm.patchValue({ "userFirstname": this.data.userFirstname, "userLastname": this.data.userLastname, "userSex": this.data.userSex, "userPhone": this.data.userPhone, "userEmail": this.data.userEmail, "userUsername": this.data.userUsername, "userPassword": this.data.userPassword, "userPrivilege": this.data.userPrivilege + "" });
		}

	}

	onClickSave(): void {

		let obj: UserModel = new UserModel("", 0, "", "", "", "", "", "", "", "", "", "", "", false, "", "", "", "");

		//------------------------------------------------------------------------------------------------

		obj.userId = this.user.userId;
		obj.userPrivilege = this.UserForm.value.userPrivilege;
		obj.userFirstname = this.UserForm.value.userFirstname;
		obj.userLastname = this.UserForm.value.userLastname;
		obj.userTitle = "";
		obj.userSex = this.UserForm.value.userSex;
		obj.userPhone = this.UserForm.value.userPhone;
		obj.userEmail = this.UserForm.value.userEmail;
		obj.userUsername = this.UserForm.value.userUsername;
		obj.userPassword = this.UserForm.value.userPassword;
		obj.userCode = this.UserForm.value.userCode;
		obj.userImg = this.UserForm.value.userImg;
		obj.userDetails = this.UserForm.value.userDetails;
		obj.createdBy = AppSettings.DEFAULT_USER.userUsername;
		obj.dateCreated = GlobalFunction.getCurrentDate(true);
		obj.modifiedBy = AppSettings.DEFAULT_USER.userUsername;
		obj.dateModified = GlobalFunction.getCurrentDate(true);

		if (this.data.param == "Update") {
			obj.userActive = true;
			obj.dateCreated = this.user.dateCreated;
			this.gProvider.update(obj, "/user").subscribe(data => {
				console.log("update user: ", obj);
				GlobalFunction.showMsgSuccess();
			}, error => {
				console.log("update user error");
				GlobalFunction.showMsgError();
			});
		} else if (this.data.param == "Delete") {
			this.gProvider.deleteObj(this.user.userId + "", "/user").subscribe(data => {
				console.log("delete user: ", obj);
				GlobalFunction.showMsgSuccess();
			}, error => {
				console.log("delete user error");
				GlobalFunction.showMsgError();
			});
		} else if (this.data.param == "Add") {
			obj.userActive = true;
			this.gProvider.addObj(obj, "/user").subscribe(data => {
				console.log("add user: ", obj);
				GlobalFunction.showMsgSuccess();
			}, error => {
				console.log("add user error");
				GlobalFunction.showMsgError();
			});
		}

		this.onNoClick();
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

}