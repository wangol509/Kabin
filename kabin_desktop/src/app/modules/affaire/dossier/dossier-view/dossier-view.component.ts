import { Component, OnInit } from '@angular/core';

import { GenericProvider } from '../../../../providers/generic';
import { AppSettings } from '../../../../providers/app-settings';

import { Folder } from '../../../../models/models';

@Component({
  selector: 'app-dossier-view',
  templateUrl: './dossier-view.component.html',
  styleUrls: ['./dossier-view.component.css']
})
export class DossierViewComponent implements OnInit {

  folders: Array<Folder>;

  constructor(private gProvider: GenericProvider) { }

  ngOnInit() {
    this.gProvider.getData("/folder/all").subscribe(data => {
      console.log("get all folder data success: ", data);
      this.folders = <Array<Folder>>data;
    }, error => {
      console.log("get all folder data error: ", error);
    })
  }

}
