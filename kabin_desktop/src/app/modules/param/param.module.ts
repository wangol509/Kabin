import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ParamMgrComponent } from './param-mgr/param-mgr.component';
import { InstitutionComponent, PeriodeComponent } from './institution/institution.component';

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
  MatPaginatorModule,
  MatOptionModule,
  MatSelectModule,
  MatStepperModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatNativeDateModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatMenuModule,
    MatExpansionModule,
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
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  declarations: [
    ParamMgrComponent,
    InstitutionComponent,
    PeriodeComponent,

  ],
  entryComponents: [
    PeriodeComponent,
  ],
})
export class ParamModule { }
