import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { GenericProvider } from '../../../providers/generic';
import { MessageModel } from '../../../models/global';
import { GlobalFunction } from '../../../global/global';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  MsgForm: FormGroup;

  constructor(private gProvider: GenericProvider, public dialogRef: MatDialogRef<MessageComponent>, private formBuilder: FormBuilder, public dialog: MatDialog) {

    this.MsgForm = this.formBuilder.group({
      sender: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(100), Validators.required])],
      subject: ['', Validators.compose([Validators.required])],
      content: ['', Validators.compose([Validators.required])],
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  send(): void {
    let msg: MessageModel = new MessageModel();
    msg.sender = this.MsgForm.value.sender;
    msg.receiver = "levilliard@gmail.com";
    msg.subject = this.MsgForm.value.subject;
    msg.content = this.MsgForm.value.content;

    this.gProvider.add(msg, "/mail").subscribe(data => {
      console.log("sending message success: ", data);
      GlobalFunction.showMsgSuccess();
      this.onNoClick();
    }, error => {
      console.log("sending message error: ", error);
      GlobalFunction.showMsgError();
      this.onNoClick();
    });

  }
}