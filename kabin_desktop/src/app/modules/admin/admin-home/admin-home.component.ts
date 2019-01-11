
import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Chart } from 'chart.js';

import { GenericProvider } from '../../../providers/generic';
import { InstitutionModel } from '../../../models/models'

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['../admin.css']
})
export class AdminHomeComponent implements OnInit {
  employees: any;
  clients = 0;
  contacts = 0;
  users = 0;
  inst: InstitutionModel;

  constructor(private gProvider: GenericProvider) {
    this.inst = <InstitutionModel>JSON.parse(window.localStorage.getItem("INSTITUTION"));

    window.localStorage.setItem("EMPLOYEE_TYPE", "smallstaff");

    this.gProvider.getData("/employee/count").subscribe(data => {
      this.employees = data;
    }, error => {
      console.log("lae emp error", error);
    });

    this.gProvider.getData("/user/all").subscribe(data => {
      this.users = data.length;
    }, error => {
      console.log("lae user error", error);
    });
  }

  ngOnInit() {
  }

}
