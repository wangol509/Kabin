import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CdkTableModule } from '@angular/cdk/table';

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
  MatAutocompleteModule,
  MatTooltipModule,
  MAT_DIALOG_DATA,
  MatDialogRef

} from '@angular/material';

import { AffaireHomeComponent } from './affaire-home/affaire-home.component';
import { AffaireMgrComponent } from './affaire-mgr/affaire-mgr.component';
import { AffairePaymentComponent } from './affaire-payment/affaire-payment.component';
import { AffaireReportComponent } from './affaire-report/affaire-report.component';
import { AffaireAudienceComponent } from './affaire-audience/affaire-audience.component';
import { AffaireDossierComponent } from './affaire-dossier/affaire-dossier.component';
import { AffaireViewComponent, AffaireDetails } from './affaire/affaire-view/affaire-view.component';
import { AffaireAddComponent } from './affaire/affaire-add/affaire-add.component';
import { AffaireDeleteComponent } from './affaire/affaire-delete/affaire-delete.component';

import { AudienceDeleteComponent } from './audience/audience-delete/audience-delete.component';
import { AudienceAddComponent } from './audience/audience-add/audience-add.component';
import { AudienceViewComponent, AudienceDetails } from './audience/audience-view/audience-view.component';

import { PersonAddComponent } from './person/person-add/person-add.component';
import { PersonUpdateComponent } from './person/person-update/person-update.component';
import { PersonDeleteComponent } from './person/person-delete/person-delete.component';

import { DossierViewComponent } from './dossier/dossier-view/dossier-view.component';

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
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  declarations: [
    AffaireHomeComponent,
    AffaireMgrComponent,
    AffairePaymentComponent,
    AffaireReportComponent,
    AffaireAudienceComponent,
    AffaireDossierComponent,
    AffaireViewComponent,
    AffaireAddComponent,
    AffaireDeleteComponent,
    AudienceDeleteComponent,
    AudienceAddComponent,
    AudienceViewComponent,
    PersonAddComponent,
    PersonUpdateComponent,
    AffaireDetails,
    PersonDeleteComponent,
    AudienceDetails,
    DossierViewComponent
  ],
  entryComponents: [
    PersonAddComponent,
    AffaireDetails,
    AudienceDetails,
    AffaireAddComponent,
    PersonUpdateComponent
  ],
  exports: [

  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class AffaireModule { }
