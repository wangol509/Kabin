import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { Angular2TokenService } from 'angular2-token';
import { GenericProvider } from '../../providers/generic';
import { HomeComponent } from './home/home.component';
import { EventMgrDialog, EventDefComponent } from './event-def/event-def.component';
import { DefaultViewComponent } from './default-view/default-view.component';
import { HomeCalendarComponent } from './home-calendar/home-calendar.component';
import { HelpComponent } from './help/help.component';
import { CallComponent } from './call/call.component';
import { MessageComponent } from './message/message.component';

import {
  MatMenuModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatDatepickerModule,
  MatGridListModule,
  MatTabsModule,
  MatSidenavModule,
  MatListModule,
  MatCheckboxModule,
  MatRadioModule,
  MatTableModule,
  MatOptionModule,
  MatSelectModule,
  MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    MatMenuModule,
    MatSelectModule,
    RouterModule,
    BrowserModule,
    MatFormFieldModule,
    HttpModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatDatepickerModule,
    MatGridListModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
    MatStepperModule,
  ],
  declarations: [
    HomeComponent,
    DefaultViewComponent,
    HomeCalendarComponent,
    HelpComponent,
    CallComponent,
    MessageComponent,
    EventMgrDialog,
    EventDefComponent
  ],
  entryComponents: [
    HelpComponent,
    CallComponent,
    MessageComponent,
    EventMgrDialog,
    EventDefComponent
  ],
  exports: [HomeCalendarComponent],
  providers: [GenericProvider, Angular2TokenService]
})
export class HomeModule { }
