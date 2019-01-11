
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Component, ViewEncapsulation } from '@angular/core';
import { AppSettings } from '../../providers/app-settings';
import { GenericProvider } from '../../providers/generic';
import { InstitutionModel, UserModel } from '../../models/models';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/do';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [GenericProvider],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

    LOGIN_FORM: FormGroup;
    isLogin: boolean = false;
    user: UserModel;
    isValid: boolean = false;
    errMsg: string = "Informations invalides";
    institution: string;

    loadEnd: boolean = false;
    mode: string = "indeterminate";

    constructor(private route: ActivatedRoute, private gProvider: GenericProvider, private router: Router, private formBuilder: FormBuilder) {
        console.log("login page ... ");
        //window.localStorage.setItem("BASE_URI", "http://localhost:8080/laepro/laepro");

        this.LOGIN_FORM = this.formBuilder.group({
            userUsername: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(45), Validators.required])],
            userPassword: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(45), Validators.required])],
        });

        this.user = AppSettings.DEFAULT_USER;

        this.gProvider.getData("/institution/all/1").subscribe(data => {
            let obj: Object = data;

            AppSettings.INSTITUTION = <InstitutionModel>obj;
            this.institution = AppSettings.INSTITUTION.institutionName;

            console.log("on login institution: ", AppSettings.INSTITUTION);

            if (this.institution == null) {
                this.institution = "NONENREGISTRE";
            } else {
                window.localStorage.setItem("INSTITUTION", JSON.stringify(AppSettings.INSTITUTION));
            }
        }, error => {
            console.log("get  institution data error: ", error);
            this.institution = "NONENREGISTRE";
        });

        setTimeout(() => {
            this.loadEnd = true;
            this.mode = "determinate";
        }, 500);
    }

    onNoClick(): void {

    }


    validateUser(): void {
        console.log("user to login ... ", this.user);
        this.user.userUsername = this.LOGIN_FORM.value.userUsername;
        this.user.userPassword = this.LOGIN_FORM.value.userPassword;

        this.gProvider.login(this.user, "/user/login").subscribe(data => {
            console.log("on login ... ", data);
            AppSettings.DEFAULT_USER = <UserModel>data;
            window.localStorage.setItem("USER", JSON.stringify(AppSettings.DEFAULT_USER));
            this.router.navigate(["/home"]);
        }, error => {
            this.router.navigate(["/login"]);
            this.isValid = true;
        });
    }
}
