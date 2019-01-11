
import { Component, OnInit } from '@angular/core';
import { GenericProvider } from '../../../providers/generic';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-default-view',
  templateUrl: './default-view.component.html',
  styleUrls: ['./default-view.component.css']
})
export class DefaultViewComponent implements OnInit {

  affs = 0;
  auds = 0;
  doss = 0;
  clients = 0;

  constructor(private gProvider: GenericProvider) {

  }

  ngOnInit() {
    Observable.forkJoin(
      this.gProvider.getData("/affaire/count"),
      this.gProvider.getData("/folder/count"),
      this.gProvider.getData("/audience/count"),
      this.gProvider.getData("/client/count"))
      .subscribe(response => {
        this.affs = parseInt(response[0].toString());
        this.doss = parseInt(response[1].toString());
        this.auds = parseInt(response[2].toString());
        this.clients = parseInt(response[3].toString());

        console.log(" count all data: ", response);
      }, error => {
        console.log("error count data: ", error);
      });
  }

}
