
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  EmployeePaymentDatabase,
  EmployeeDataSource,
  EmployeePaymentDetails,
  EmployeePayment,
  EmployeePaymentHistoric
} from '../employee-pay-util/employee-pay-util.component';

import { MatPaginator, MatDialog, } from '@angular/material';
import { GenericProvider } from '../../../../providers/generic';

@Component({
  selector: 'employee-pay',
  templateUrl: './employee-pay.component.html',
  styleUrls: ['../../admin.css']
})
export class EmployeePayComponent implements OnInit {
  emp_type = localStorage.getItem("EMPLOYEE_TYPE");
  displayedColumns = ['Nom', 'Funct', 'Montant', 'Balance', /*'Status',*/ "Details", "Paye", "Historique"];
  stdDatabase = new EmployeePaymentDatabase(this.gProvider, "/payment_employee/all/pay/type/" + this.emp_type);
  dataSource: EmployeeDataSource | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private gProvider: GenericProvider, public dialog: MatDialog) {
    console.clear();
  }

  ngOnInit() {
    this.dataSource = new EmployeeDataSource(this.stdDatabase, this.paginator);
  }

  openDetailsDialog(obj): void {
    let dialogRef = this.dialog.open(EmployeePaymentDetails, {
      width: '600px',
      height: '450px',
      data: obj
    });

  }

  openPayDialog(data) {
    let dialogRef = this.dialog.open(EmployeePayment, {
      width: '450px',
      height: '350px',
      data: data
    });
  }

  openHistoriqueDialog(data) {
    let dialogRef = this.dialog.open(EmployeePaymentHistoric, {
      width: '650px',
      height: '650px',
      data: data
    });
  }

  goToRefresh() {

  }
}
