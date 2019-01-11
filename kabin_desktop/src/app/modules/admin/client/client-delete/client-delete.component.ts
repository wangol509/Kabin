
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ClientModel } from '../../../../models/models';
import { GenericProvider } from '../../../../providers/generic';


@Component({
  selector: 'client-delete',
  templateUrl: './client-delete.component.html',
  styleUrls: ['../../admin.css']
})
export class ClientDeleteComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  emp: ClientModel;
  code: any;
  result: string = "Non Fait !";

  constructor(private _formBuilder: FormBuilder, private gProvider: GenericProvider) {

  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      stdCode: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      stdName: ['', Validators.required],
    });
  }

  setStd() {
    this.code = this.firstFormGroup.value.stdCode;

    if (this.code != null && this.code.length > 0) {
      this.gProvider.getData("/client/delete/" + this.code).subscribe(data => {
        let obj: Object = data
        this.emp = <ClientModel>obj;
        console.log("show client: ", data);
        if (this.emp != null) {
          this.secondFormGroup.patchValue({ "stdName": this.emp.clientFirstname + " " + this.emp.clientLastname });
        }
      }, error => {
        console.log("Error:", error);
      })

    }
  }

  deleteEmp() {
    console.log("Delete emp with id: ", this.firstFormGroup.value.stdCode);
    this.gProvider.deleteObj(this.firstFormGroup.value.stdCode, "/client").subscribe(data => {
      this.result = "Fait !";
      console.log("client success: ", data);
      //window.location.reload();
      this.resetForms();
    }, error => {
      console.log("client error: ", error);
    })
  }

  resetForms() {
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
  }
}

