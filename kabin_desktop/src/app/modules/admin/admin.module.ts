import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminEmployeeComponent } from './admin-employee/admin-employee.component';
import { AdminContactComponent } from './admin-contact/admin-contact.component';
import { EmployeeDeleteComponent } from './employee/employee-delete/employee-delete.component';
import { EmployeeUpdateComponent } from './employee/employee-update/employee-update.component';
import { EmployeeAddComponent } from './employee/employee-add/employee-add.component';
import { EmployeeViewComponent, EmployeeDetails } from './employee/employee-view/employee-view.component';
import { EmployeePayComponent } from './employee/employee-pay/employee-pay.component';
import { EmployeeReportComponent } from './employee/employee-report/employee-report.component';
import { AdminPayMgrComponent } from './admin-pay-mgr/admin-pay-mgr.component';
import { EmployeePaymentDetails, EmployeePayment, EmployeePaymentHistoric } from './employee/employee-pay-util/employee-pay-util.component';
import { UserComponent, DialogUserUpdateDialog } from './user/user/user.component';
import { AdminUserComponent } from './admin-user/admin-user.component';



import { AdminClientComponent } from './admin-client/admin-client.component';
import { ClientDeleteComponent } from './client/client-delete/client-delete.component';
import { ClientUpdateComponent } from './client/client-update/client-update.component';
import { ClientAddComponent } from './client/client-add/client-add.component';
import { ClientViewComponent, ClientDetails } from './client/client-view/client-view.component';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { FileUploadModule } from 'ng2-file-upload';

import {
  MatMenuModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatGridListModule,
  MatTabsModule,
  MatSidenavModule,
  MatListModule,
  MatCheckboxModule,
  MatRadioModule,
  MatTableModule,
  MatOptionModule,
  MatPaginatorModule,
  MatSelectModule,
  MatStepperModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTooltipModule,
} from '@angular/material';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  imports: [
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatOptionModule,
    MatSelectModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CdkTableModule,
    RouterModule,
    CommonModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminHomeComponent,
    AdminUserComponent,
    AdminContactComponent,
    AdminEmployeeComponent,
    EmployeeDeleteComponent,
    EmployeeUpdateComponent,
    ClientUpdateComponent,
    EmployeeAddComponent,
    EmployeeViewComponent,
    EmployeePayComponent,
    EmployeeDetails,
    ClientDetails,
    EmployeeReportComponent,
    EmployeePaymentDetails,
    EmployeePaymentHistoric,
    EmployeePayment,
    AdminPayMgrComponent,
    UserComponent,
    DialogUserUpdateDialog,

    AdminClientComponent,
    ClientDeleteComponent,
    ClientUpdateComponent,
    ClientAddComponent,
    ClientViewComponent,
    ContactComponent,
  ],
  entryComponents: [
    EmployeeDetails,
    ClientDetails,
    EmployeeUpdateComponent,
    ClientUpdateComponent,
    EmployeePaymentDetails,
    EmployeePaymentHistoric,
    EmployeePayment,
    DialogUserUpdateDialog
  ],
  exports: [
    EmployeeViewComponent,
    EmployeeAddComponent,
    EmployeeDeleteComponent,
    AdminPayMgrComponent
  ]
})
export class AdminModule { }
