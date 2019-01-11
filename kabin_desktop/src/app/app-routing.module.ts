/*
------------------------------------------------------------------------
    LAE PRO 2018
    CLIENT
    @levilliard
------------------------------------------------------------------------
*/

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SecurityRoutes } from './security/security.routes';
import { HomeRoutes } from './modules/home/home.module.routes';

/* security component */
import { LoginComponent } from './security/login/login.component';

/* affaire component */
import { AffaireHomeComponent } from './modules/affaire/affaire-home/affaire-home.component';
import { AffaireMgrComponent } from './modules/affaire/affaire-mgr/affaire-mgr.component';
import { AffairePaymentComponent } from './modules/affaire/affaire-payment/affaire-payment.component';
import { AffaireReportComponent } from './modules/affaire/affaire-report/affaire-report.component';
import { AffaireAudienceComponent } from './modules/affaire/affaire-audience/affaire-audience.component';
import { AffaireDossierComponent } from './modules/affaire/affaire-dossier/affaire-dossier.component';

import { HomeComponent } from './modules/home/home/home.component';
import { DefaultViewComponent } from './modules/home/default-view/default-view.component';

/* component */
import { AdminHomeComponent } from './modules/admin/admin-home/admin-home.component';
import { AdminUserComponent } from './modules/admin/admin-user/admin-user.component';
import { AdminClientComponent } from './modules/admin/admin-client/admin-client.component';
import { AdminContactComponent } from './modules/admin/admin-contact/admin-contact.component';
import { AdminEmployeeComponent } from './modules/admin/admin-employee/admin-employee.component';
import { AdminPayMgrComponent } from './modules/admin/admin-pay-mgr/admin-pay-mgr.component';

/* user component */
//import { UserComponent } from './modules/admin/user/user/user.component';

/* param component */
import { ParamMgrComponent } from './modules/param/param-mgr/param-mgr.component'

//securitycomponent
import { AuthGuard } from './security/guards/guards.component';

export const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent, children: [
      //home menu
      {
        path: 'aff',
        component: AffaireHomeComponent,
        outlet: 'home'
      },

      {
        path: 'emp',
        component: AdminHomeComponent,
        outlet: 'home'
      },

      {
        path: 'usr',
        component: AdminUserComponent,
        canActivate: [AuthGuard],
        outlet: 'home'
      },

      {
        path: 'param',
        component: ParamMgrComponent,
        canActivate: [AuthGuard],
        outlet: 'home'
      },

      {
        path: '',
        component: DefaultViewComponent,
        outlet: 'home'
      },

      //affaire[home, mgr, ]
      {
        path: "aff_home",
        component: AffaireHomeComponent,
        outlet: "home"
      },
      {
        path: "aff_mgr",
        component: AffaireMgrComponent,
        outlet: "home"
      },
      {
        path: "aff_pay",
        component: AffairePaymentComponent,
        outlet: "home"
      },
      {
        path: "aff_report",
        component: AffaireReportComponent,
        outlet: "home"
      },
      {
        path: "aff_aud",
        component: AffaireAudienceComponent,
        outlet: "home"
      },
      {
        path: "aff_folder",
        component: AffaireDossierComponent,
        outlet: "home"
      },

      //employee[small staff, teacher, admin] menu
      {
        path: "emp_home",
        component: AdminHomeComponent,
        outlet: "home"
      },

      {
        path: "emp_mgr",
        component: AdminEmployeeComponent,
        outlet: "home"
      },

      {
        path: "emp_pay",
        component: AdminPayMgrComponent,
        outlet: "home"
      },

      //client menu        
      {
        path: "client_mgr",
        component: AdminClientComponent,
        outlet: "home"
      },

      //contact menu        
      {
        path: "contact_mgr",
        component: AdminContactComponent,
        outlet: "home"
      },

      // {
      //   path: "emp_report",
      //   component: EmployeeReportComponent,
      //   outlet: "home"
      // }
    ]
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },

];
