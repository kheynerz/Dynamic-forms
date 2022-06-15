import { Component, OnInit } from '@angular/core';
import {componentList} from './menu-list'
import {properties} from './menu-list'
import {CanvaComponent} from '../canva/canva.component'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  canva = new CanvaComponent();
  sideComponents = componentList;
  sideProperties = properties;
  collapse = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.collapse = !this.collapse;
  }

  sidebarActions() {
    //download and upload here
  }

  setDraggable(id:string){
    this.canva.onChange(id);
  }

}
