
import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GenericProvider } from '../../../providers/generic';
import { AppSettings } from '../../../providers/app-settings';
import { GlobalFunction } from '../../../global/global';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { InstitutionModel, Event, UserModel } from '../../../models/models';
import { Router } from '@angular/router';
import { error } from 'util';


@Component({
  selector: 'event-def',
  templateUrl: './event-def.component.html',
  styleUrls: ['./event-def.component.css']
})
export class EventDefComponent implements OnInit {

  events: Array<Event>;
  new_events: Array<Event>;
  defaultEvent: Event;
  user: UserModel;

  constructor(private gProvider: GenericProvider, public dialog: MatDialog) {
    //console.clear();
    this.defaultEvent = new Event();
    this.user = <UserModel>JSON.parse(window.localStorage.getItem("USER"));
    console.log("user: ", this.user);
  }

  ngOnInit() {
    this.events = [];
    this.new_events = [];
    this.fetchData();
  }

  fetchData(): void {
    this.gProvider.getData("/event/all/").subscribe(data => {
      console.log("event found: ", data);
      this.events = <Array<Event>>data;
      this.new_events = this.events;
    }, error => {
      console.log("event data error: ", error);
    });
  }

  updateEvents(ctr: string) {
    this.events = [];

    if ("all" == ctr) {
      this.events = this.new_events;
      return;
    }

    for (let i = 0; i < this.new_events.length; ++i) {
      let concens = this.new_events[i].eventConcerns + "";
      if (concens.indexOf(ctr) != -1) {
        this.events.push(this.new_events[i]);
      }
    }
  }

  openDialog(c, param, w, h): void {
    let data: any = new Object();

    data.param = param;
    data.event = c;
    data.user = this.user;

    let dialogRef = this.dialog.open(EventMgrDialog, {
      width: w,
      height: h,
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {
        this.fetchData();
        console.log("Updated Events: ", this.events);
      }, 3000);
    });
  }

  convertStrDate(dt: any) {
    return new Date(dt).toDateString();
  }
}

@Component({
  selector: 'event-mgr-dialog',
  templateUrl: 'event-def-dialog.html',
  styleUrls: ['./event-def.component.css'],
  providers: [GenericProvider]
})
export class EventMgrDialog implements OnInit {
  event: Event;
  user: UserModel;
  EventForm: FormGroup;
  isDelete: boolean;
  isDetails: boolean;

  constructor(public dialogRef: MatDialogRef<EventMgrDialog>, private formBuilder: FormBuilder, private gProvider: GenericProvider, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.event = this.data.event;
    this.user = this.data.user;

    this.EventForm = this.formBuilder.group({
      eventTitle: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(100), Validators.required])],
      eventDesc: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(400), Validators.required])],
      eventDstart: ['', Validators.compose([Validators.required])],
      eventDend: ['', Validators.compose([Validators.required])],
      eventConcerns: ['', Validators.compose([Validators.required])],
      eventDetails: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(400)])],

    });

    if (this.data.param == "Update" || this.data.param == "Details") {
      this.event.eventDstart = (new Date(this.event.eventDstart)).toISOString().slice(0, 16);
      this.event.eventDend = (new Date(this.event.eventDend)).toISOString().slice(0, 16);
    }

    if (this.data.param == "Update" || this.isDelete) {
      this.EventForm.setValue({
        "eventTitle": this.event.eventTitle,
        "eventDesc": this.event.eventDesc,
        "eventDstart": this.event.eventDstart,
        "eventDend": this.event.eventDend,
        "eventConcerns": this.event.eventConcerns.split(","),
        "eventDetails": this.event.eventDetails,
      });
    } else if (this.data.param == "Add") {
      this.EventForm.setValue({
        "eventTitle": "",
        "eventDesc": "",
        "eventDstart": "",
        "eventDend": "",
        "eventConcerns": "",
        "eventDetails": "",
      });
    } else if (this.data.param == "Details") {
      this.EventForm.setValue({
        "eventTitle": this.event.eventTitle,
        "eventDesc": this.event.eventDesc,
        "eventDstart": this.event.eventDstart,
        "eventDend": this.event.eventDend,
        "eventConcerns": this.event.eventConcerns.split(","),
        "eventDetails": this.event.eventDetails,
      });
    } else {
      this.EventForm.setValue({
        "eventTitle": this.event.eventTitle,
        "eventDesc": this.event.eventDesc,
        "eventDstart": this.event.eventDstart,
        "eventDend": this.event.eventDend,
        "eventConcerns": this.event.eventConcerns.split(","),
        "eventDetails": this.event.eventDetails,

      });
    }
  }

  ngOnInit() {
    console.log("Form DATA: ", this.EventForm.value);
  }

  convertStrDate(dt: any) {
    return new Date(dt).toDateString();
  }

  private convertDateToMs(dt: any): string {
    return new Date(dt).getTime() + "";
  }

  // updateConcerns(param: string){
  //   switch(param){
  //     case "student":
  //     let str: string = this.EventForm.value.eventConcerns;
  //     if(str.length > 0){
  //       if(str.indexOf("el") == -1){
  //         this.EventForm.setValue({"eventConcerns:" + })
  //       }
  //     }
  //     break;
  //   }
  // }

  onClickSave(): void {
    let obj1: Event = new Event();
    obj1.userId = parseInt(("" + this.user.userId).trim());
    obj1.eventTitle = this.EventForm.value.eventTitle;
    obj1.eventDesc = this.EventForm.value.eventDesc;
    obj1.eventDstart = this.convertDateToMs(this.EventForm.value.eventDstart);
    obj1.eventDend = this.convertDateToMs(this.EventForm.value.eventDend);
    obj1.eventConcerns = this.EventForm.value.eventConcerns + "";
    obj1.eventDetails = this.EventForm.value.eventDetails;
    obj1.createdBy = AppSettings.DEFAULT_USER.userUsername;
    obj1.dateCreated = new Date().getTime() + "";

    console.log("event add test: ", obj1);

    if (this.data.param == "Update") {
      obj1.eventId = this.event.eventId;
      obj1.modifiedBy = AppSettings.DEFAULT_USER.userUsername;
      obj1.dateModified = new Date().getTime() + "";
      this.gProvider.update(obj1, "/event").subscribe(data => {
        console.log("Update event success: ", data);

      }, error => {
        console.log("Update class error: ", error);
        this.onNoClick();
      });
    } else if (this.data.param == "Delete") {
      this.gProvider.deleteObj(this.event.eventId + "", "/event").subscribe(data => {
        console.log("Delete event success: ", data);
        this.onNoClick();
        GlobalFunction.showMsgSuccess();
      }, error => {
        console.log("Delete event error: ", error);
        this.dialogRef.close();
      })
    } else if (this.data.param == "Add") {
      this.gProvider.add(obj1, "/event").subscribe(data => {
        console.log("adding event success: ", data);
        //GlobalFunction.showMsgSuccess();
      }, error => {
        console.log("adding event error: ", error);
        this.onNoClick();
      })
    }
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}