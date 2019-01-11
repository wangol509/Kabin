

import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GenericProvider } from '../../../providers/generic';
import { AppSettings } from '../../../providers/app-settings';
import { GlobalFunction } from '../../../global/global';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { InstitutionModel, Periode, AddressModel } from '../../../models/models';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.css']
})
export class InstitutionComponent implements OnInit {

  institution: InstitutionModel;
  addr: AddressModel;
  isFound: boolean = false;
  InstForm: FormGroup;
  isUpdate: boolean = false;

  constructor(private gProvider: GenericProvider, private formBuilder: FormBuilder, public dialog: MatDialog) {
    console.clear();

    this.institution = new InstitutionModel();
    this.fetchData();
    this.isUpdate = false;

    this.InstForm = this.formBuilder.group({
      institutionName: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(40), Validators.required])],
      institutionDetails: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(40), Validators.required])],
      schoolBeginDate: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(40), Validators.required])],
      schoolEndDate: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(40), Validators.required])],

      sAddressCountry: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(50), Validators.required])],
      sAddressState: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(50), Validators.required])],
      sAddressCity: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(50), Validators.required])],
      sAddressStreet: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(50), Validators.required])],
      sAddressDetails: ['', Validators.compose([Validators.maxLength(200)])],
    });

    this.InstForm.patchValue({
      "sAddressCountry": "Haiti"
    });
  }

  ngOnInit() {

  }

  private fetchData(): void {
    this.gProvider.getData("/institution/all/1").subscribe(data => {
      console.log("institution found: ", data);
      let obj: Object = data;
      this.institution = <InstitutionModel>obj;
      this.addr = <AddressModel>obj;
      AppSettings.INSTITUTION = this.institution;
      console.log("institution obj: ", data);

      if (this.institution != null && this.institution.institutionId != undefined) {
        this.isFound = true;
        //AppSettings.ADDRESS = <AddressModel>obj;
      }

    }, error => {

    });
  }

  saveInst() {
    if (!this.isUpdate) {
      this.addInst();
    } else {
      this.updateInst();
    }
  }

  addInst() {

    if (this.isFound) {
      //inst already added
      return;
    }

    let sAddr = new AddressModel();
    sAddr.addressId = null;
    sAddr.addressCountry = this.InstForm.value.sAddressCountry;
    sAddr.addressState = this.InstForm.value.sAddressState;
    sAddr.addressCity = this.InstForm.value.sAddressCity;
    sAddr.addressStreet = this.InstForm.value.sAddressStreet;
    sAddr.addressDetails = this.InstForm.value.sAddressDetails;
    sAddr.createdBy = AppSettings.DEFAULT_USER.userUsername;
    sAddr.dateCreated = GlobalFunction.getCurrentDate(true);
    sAddr.modifiedBy = AppSettings.DEFAULT_USER.userUsername;
    sAddr.dateModified = GlobalFunction.getCurrentDate(true);

    this.addr = sAddr;
    let inst: InstitutionModel = new InstitutionModel();

    let d1 = new Date(Date.parse(this.InstForm.value.schoolBeginDate)).toISOString().split("T")[0];
    let d2 = new Date(Date.parse(this.InstForm.value.schoolEndDate)).toISOString().split("T")[0];

    inst.institutionId = 1;
    inst.institutionName = this.InstForm.value.institutionName;
    inst.institutionDetails = this.InstForm.value.institutionDetails;
    inst.schoolBeginDate = d1;
    inst.schoolEndDate = d2;
    inst.createdBy = AppSettings.DEFAULT_USER.userUsername;
    inst.dateCreated = GlobalFunction.getCurrentDate(true);
    inst.modifiedBy = AppSettings.DEFAULT_USER.userUsername;
    inst.dateModified = GlobalFunction.getCurrentDate(true);

    this.gProvider.add(sAddr, "/address").subscribe(data => {
      console.log("adding address success ... ", data);
      let id: number = parseInt(data.toString());
      inst.addressId = id;
      this.addr.addressId = id;

      this.gProvider.addObj(inst, "/institution").subscribe(response => {
        console.log("adding institution success ... ", response);
        this.institution = inst;
        this.isFound = true;
        window.localStorage.setItem("INSTITUTION", JSON.stringify(inst));
        alert("Operation Success !");
      }, error => {
        console.log("adding address error ... ", error);
        this.isFound = true;
        alert("adding institution error !");
      });
    }, error => {
      console.log("address error ... ", error);
    });
  }

  showUpdate(): void {
    this.InstForm.patchValue({
      institutionName: this.institution.institutionName,
      institutionDetails: this.institution.institutionDetails,
      schoolBeginDate: new Date(Date.parse(this.institution.schoolBeginDate)).toISOString().split("T")[0],
      schoolEndDate: new Date(Date.parse(this.institution.schoolEndDate)).toISOString().split("T")[0],
      sAddressCountry: this.addr.addressCountry,
      sAddressState: this.addr.addressState,
      sAddressCity: this.addr.addressCity,
      sAddressStreet: this.addr.addressStreet,
      sAddressDetails: this.addr.addressDetails
    });

    this.isUpdate = true;
    this.isFound = !this.isFound;
  }

  updateInst() {
    let sAddr = new AddressModel();
    sAddr.addressId = this.institution.addressId;
    sAddr.addressCountry = this.InstForm.value.sAddressCountry;
    sAddr.addressState = this.InstForm.value.sAddressState;
    sAddr.addressCity = this.InstForm.value.sAddressCity;
    sAddr.addressStreet = this.InstForm.value.sAddressStreet;
    sAddr.addressDetails = this.InstForm.value.sAddressDetails;
    sAddr.createdBy = AppSettings.DEFAULT_USER.userUsername;
    sAddr.dateCreated = GlobalFunction.getCurrentDate(true);
    sAddr.modifiedBy = AppSettings.DEFAULT_USER.userUsername;
    sAddr.dateModified = GlobalFunction.getCurrentDate(true);

    let d1 = new Date(Date.parse(this.InstForm.value.schoolBeginDate)).toISOString().split("T")[0];
    let d2 = new Date(Date.parse(this.InstForm.value.schoolEndDate)).toISOString().split("T")[0];

    console.log("d1, d2: ", d1, d2);

    let inst: InstitutionModel = new InstitutionModel();
    inst.institutionId = 1;
    inst.addressId = this.institution.addressId;
    inst.institutionName = this.InstForm.value.institutionName;
    inst.institutionDetails = this.InstForm.value.institutionDetails;
    inst.schoolBeginDate = d1;
    inst.schoolEndDate = d2;
    inst.createdBy = this.institution.modifiedBy;
    inst.dateCreated = this.institution.dateCreated;
    inst.modifiedBy = AppSettings.DEFAULT_USER.userUsername;
    inst.dateModified = GlobalFunction.getCurrentDate(true);

    console.log("add obj: ", sAddr, inst);

    this.gProvider.update(sAddr, "/address").subscribe(data => {
      console.log("update address success ... ", data);
      let id: number = parseInt(data.toString());
      inst.addressId = id;
    }, error => {
      console.log("address error ... ", error);
    });

    this.gProvider.update(inst, "/institution").subscribe(response => {
      console.log("update institution success ... ", response);
      this.institution = inst;
      AppSettings.INSTITUTION = inst;
      window.localStorage.setItem("INSTITUTION", JSON.stringify(inst));
    }, error => {
      console.log("update address error ... ", error);
    });

    setTimeout(() => {
      this.isFound = !this.isFound;
    }, 3000);
  }
}


@Component({
  selector: 'app-periode',
  templateUrl: './periode.component.html',
  styleUrls: ['./institution.component.css']
})
export class PeriodeComponent implements OnInit {

  PeriodeForm: FormGroup;
  periodes: Array<Periode>;
  panelOpenState: boolean = false;

  constructor(private formBuilder: FormBuilder, private gProvider: GenericProvider) {
    this.PeriodeForm = this.formBuilder.group({
      periodeNo: ['', Validators.compose([Validators.required])],
      periodeName: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(100), Validators.required])],
      periodeDstart: ['', Validators.required],
      periodeDend: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.fetchData();
  }

  savePeriode() {
    let obj: Periode = <Periode>this.PeriodeForm.value;
    obj.institutionId = AppSettings.INSTITUTION.institutionId;
    obj.createdBy = AppSettings.DEFAULT_USER.userUsername;
    obj.dateCreated = new Date().getTime() + "";
    obj.modifiedBy = AppSettings.DEFAULT_USER.userUsername;
    obj.periodeDstart = new Date(Date.parse(obj.periodeDstart)).toISOString().split("T")[0];
    obj.periodeDend = new Date(Date.parse(obj.periodeDend)).toISOString().split("T")[0];

    this.gProvider.add(obj, "/periode").subscribe(data => {
      console.log("add periode success: ", data);
      obj.periodeId = parseInt(data.toString());
      this.periodes.push(obj);
      console.log("add periode: ", obj);
      alert(" add periode success !");
      this.PeriodeForm.reset();
    }, error => {
      console.log("periode error ... ", error);
      alert("Une erreur s'est produite. Veuiller verifier s'il n'y a pas de doublon pour le numero de periode");
    });
  }

  private fetchData(): void {
    this.gProvider.getData("/periode/all/").subscribe(data => {
      console.log("periode found: ", data);
      let obj: Object = data;
      this.periodes = <Array<Periode>>obj;

      console.log("periode obj: ", data);
    }, error => {
      console.log("periode error: ", error);
    });
  }

  deleteObj(id: number) {
    this.gProvider.deleteObj(id + "", "/periode").subscribe(data => {
      console.log("delete periode: ", data);
      let arr: Array<Periode> = this.periodes.filter(function (element) {
        return id !== element.periodeId;
      });
      this.periodes = arr.slice();

    }, error => {
      console.log("delete periode error: ", error);

    });
  }
}


// @Component({
//   selector: 'dialog-periode',
//   templateUrl: 'dialog-content-example.html',
// })
// export class DialogContentExample {
//   constructor(public dialog: MatDialog) {}

//   openDialog() {
//     const dialogRef = this.dialog.open(DialogContentExampleDialog, {
//       height: '350px'
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       console.log(`Dialog result: ${result}`);
//     });
//   }
// }

// @Component({
//   selector: 'dialog-content-example-dialog',
//   templateUrl: 'dialog-content-example-dialog.html',
// })
// export class DialogContentExampleDialog {}
