import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/router/src/config';

@Component({
  selector: 'app-param-mgr',
  templateUrl: './param-mgr.component.html',
  styleUrls: ['./param-mgr.component.css']
})
export class ParamMgrComponent implements OnInit {
  uri = new FormControl('', Validators.compose([Validators.minLength(10), Validators.maxLength(45), Validators.required]));

  constructor(private router: Router) { }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.uri.hasError('required') ? 'You must enter a value' :
      this.uri.hasError('email') ? 'Not a valid email' :
        '';
  }

  setUrl(): void {
    //http://localhost:8080/laepro/laepro
    window.localStorage.setItem("BASE_URI", "http://" + this.uri.value.trim() + ":8080/laepro/laepro");
    this.router.navigate(["/login"]);
  }
}
