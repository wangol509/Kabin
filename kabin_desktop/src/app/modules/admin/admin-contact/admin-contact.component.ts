import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-contact',
  templateUrl: './admin-contact.component.html',
  styleUrls: ['../admin.css']
})
export class AdminContactComponent implements OnInit {

  constructor(private router: Router) {

  }
  ngOnInit() {
  }

  goToRefresh() {
    this.router.navigate(["/home:contact_mgr"]);
  }
}
