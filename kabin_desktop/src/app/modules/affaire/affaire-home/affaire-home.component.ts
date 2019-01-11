
import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Chart } from 'chart.js';

import { GenericProvider } from '../../../providers/generic';
import { AppSettings } from '../../../providers/app-settings';
import { InstitutionModel } from '../../../models/models'

@Component({
  selector: 'app-affaire-home',
  templateUrl: './affaire-home.component.html',
  styleUrls: ['../affaire.css']
})
export class AffaireHomeComponent implements OnInit {
  data: any;
  inst: InstitutionModel;

  affs = 0;
  auds = 0;
  doss = 0;

  constructor(private gProvider: GenericProvider) {
    this.inst = <InstitutionModel>JSON.parse(window.localStorage.getItem("INSTITUTION"));
    //window.localStorage.setItem("EMPLOYEE_TYPE", "smallstaff");
  }

  ngOnInit() {
    this.gProvider.getData("/affaire/count").subscribe(data => {
      this.affs = parseInt(data + "");
      console.log("count affaire data: ", data);

    }, error => {
      console.log("Error count affaire data: ", error);
    });

    this.gProvider.getData("/folder/count").subscribe(data => {
      this.doss = parseInt(data + "");
      console.log("count affaire data: ", data);
    }, error => {
      console.log("Error count folder data: ", error);
    });

    this.gProvider.getData("/audience/count").subscribe(data => {
      this.auds = parseInt(data + "");
      console.log("count affaire data: ", data);
    }, error => {
      console.log("Error count audience data: ", error);
    });
  }

}
