
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//import { AppSettings } from '../providers/app-settings';
import { UserModel } from '../../models/models';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let user: UserModel = <UserModel>JSON.parse(window.localStorage.getItem("USER"));

        let priv: number = user.userPrivilege;
        console.log("Guard user priv: ", user);

        if (priv == 1) {
            return true;
        }

        alert("Authorization failed, check the admin !");

        return false;
    }
}