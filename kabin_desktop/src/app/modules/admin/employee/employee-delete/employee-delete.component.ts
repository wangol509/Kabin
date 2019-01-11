
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EmployeeModel } from '../../../../models/models';
import { GenericProvider } from '../../../../providers/generic';


@Component({
  selector: 'employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['../../admin.css']
})
export class EmployeeDeleteComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  emp: EmployeeModel;
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
      this.gProvider.getData("/employee/delete/" + this.code).subscribe(data => {
        let obj: Object = data
        this.emp = <EmployeeModel>obj;
        console.log("show emp: ", data);
        if (this.emp != null) {
          this.secondFormGroup.patchValue({ "stdName": this.emp.employeeFirstname + " " + this.emp.employeeLastname });
        }
      }, error => {
        console.log("Error:", error);
      })

    }
  }

  deleteEmp() {
    console.log("Delete emp with id: ", this.firstFormGroup.value.stdCode);
    this.gProvider.deleteObj(this.firstFormGroup.value.stdCode, "/employee").subscribe(data => {
      this.result = "Fait !";
      console.log("employee success: ", data);
      //window.location.reload();
      this.resetForms();
    }, error => {
      console.log("employee error: ", error);
    })
  }

  resetForms() {
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
  }
}

