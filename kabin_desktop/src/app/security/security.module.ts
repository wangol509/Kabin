
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatGridListModule,
  MatOptionModule,
  MatProgressBarModule
} from '@angular/material';


import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/guards.component';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatOptionModule,
    MatProgressBarModule
  ],

  declarations: [
    LoginComponent
  ],

  entryComponents: [
  ],

  providers: [AuthGuard]

})
export class SecurityModule {

}
