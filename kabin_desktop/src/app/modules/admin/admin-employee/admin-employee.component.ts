import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-employee',
  templateUrl: './admin-employee.component.html',
  styleUrls: ['../admin.css']
})
export class AdminEmployeeComponent implements OnInit {

  constructor(private router: Router) {

  }
  ngOnInit() {
  }

  goToRefresh() {
    this.router.navigate(["/home:emp_mgr"]);
  }
}
