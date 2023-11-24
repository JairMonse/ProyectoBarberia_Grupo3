import { Component, OnInit } from '@angular/core';
import { BarberoInterface } from 'src/app/core/interfaces/barbero-interface';
import { BarberoService } from 'src/app/core/services/barbero.service';

@Component({
  selector: 'app-barberos-page',
  templateUrl: './barberos-page.component.html',
  styleUrls: ['./barberos-page.component.css']
})
export class BarberosPageComponent implements OnInit {

  barberos: BarberoInterface[] = []

  constructor(
    private _barberosServices: BarberoService
  ) { }
  
  ngOnInit(): void {
    this.barberos = this._barberosServices.get()
  }


}
