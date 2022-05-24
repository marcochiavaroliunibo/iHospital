import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DrugService} from "../service/drug-service/drug.service";

@Component({
  selector: 'app-farmaci-registrati',
  templateUrl: './farmaci-registrati.component.html',
  styleUrls: ['./farmaci-registrati.component.css']
})
export class FarmaciRegistratiComponent implements OnInit {

  drugs: any;

  constructor(private _drug:DrugService, private _router:Router) {
    this._drug.allDrugs().subscribe(
      res => this.drugs = res.data,
      error => console.log(error)
    )
  }

  ngOnInit(): void {
  }

}
