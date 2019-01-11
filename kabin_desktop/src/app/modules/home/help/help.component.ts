import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  isLinear = false;


  constructor(public dialogRef: MatDialogRef<HelpComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }
}
