
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Person } from '../../../../models/models';
import { GenericProvider } from '../../../../providers/generic';


@Component({
  selector: 'person-delete',
  templateUrl: './person-delete.component.html',
  styleUrls: ['../../affaire.css']
})
export class PersonDeleteComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  per: Person;
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
      this.gProvider.getData("/person/delete/" + this.code).subscribe(data => {
        let obj: Object = data
        this.per = <Person>obj;
        console.log("show per: ", data);
        if (this.per != null) {
          this.secondFormGroup.patchValue({ "stdName": this.per.personFirstname + " " + this.per.personLastname });
        }
      }, error => {
        console.log("Error:", error);
      })

    }
  }

  deleteEmp() {
    console.log("Delete per with id: ", this.firstFormGroup.value.stdCode);
    this.gProvider.deleteObj(this.firstFormGroup.value.stdCode, "/person").subscribe(data => {
      this.result = "Fait !";
      console.log("person success: ", data);
      //window.location.reload();
      this.resetForms();
    }, error => {
      console.log("person error: ", error);
    })
  }

  resetForms() {
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
  }
}

