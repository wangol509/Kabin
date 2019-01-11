import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-client',
  templateUrl: './admin-client.component.html',
  styleUrls: ['../admin.css']
})
export class AdminClientComponent implements OnInit {

  constructor(private router: Router) {

  }
  ngOnInit() {
  }

  goToRefresh() {
    this.router.navigate(["/home:client_mgr"]);
  }
}
