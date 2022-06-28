import { Component } from '@angular/core';
import { CanvaComponent } from '../canva/canva.component';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent {
  collapse = true;
  canva!: CanvaComponent;


  constructor(){ }

  toggleSidebar() {
    this.collapse = !this.collapse;
  }

  setCanva(canva: CanvaComponent){
    this.canva = canva
  }
  showProperties(canva: CanvaComponent){
    this.canva = canva
  }

  

}
