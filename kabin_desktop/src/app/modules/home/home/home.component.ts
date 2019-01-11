
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HelpComponent } from '../help/help.component';
import { CallComponent } from '../call/call.component';
import { MessageComponent } from '../message/message.component';

import { AppSettings } from '../../../providers/app-settings';

import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { UserModel, InstitutionModel } from '../../../models/models'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  now: any;
  user: UserModel;
  inst: InstitutionModel;

  constructor(public dialog: MatDialog) {
    this.now = new Date().getFullYear();
    this.user = <UserModel>JSON.parse(window.localStorage.getItem("USER"));
    this.inst = <InstitutionModel>JSON.parse(window.localStorage.getItem("INSTITUTION"));
    if (this.inst == null) {
      this.inst = new InstitutionModel();
    }
  }

  setEmpConfig(param1: string): void {
    AppSettings.EMPLOYEE_TYPE = param1;
    console.log("emp config", param1);
  }


  openDialog(param: string): void {

    switch (param) {
      case "help":
        this.dialog.open(HelpComponent, {
          width: "850px",
          height: "500px",
          data: ""
        });
        break;

      case "message":
        this.dialog.open(MessageComponent, {
          width: "800px",
          height: "500px",
          data: ""
        });
        break;

      case "call":
        this.dialog.open(CallComponent, {
          width: "600px",
          height: "300px",
          data: ""
        });
        break;
    }
  } //-->end of openDialog()
}

