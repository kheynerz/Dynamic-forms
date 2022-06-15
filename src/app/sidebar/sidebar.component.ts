import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {componentList} from './menu-list'
import {properties} from './menu-list'
import {CanvaComponent} from '../canva/canva.component'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  @ViewChild('canva') canva!: CanvaComponent;

  sideComponents = componentList;
  sideProperties = properties;
  collapse = true;

  constructor() { }

  ngOnInit(): void {
    console.log(this.canva);
    
  }

  toggleSidebar() {
    this.collapse = !this.collapse;
  }

  sidebarActions() {
    console.log("Sidebar actions");
    
  }
  saveJSON() {
    console.log("Sidebar actions");
    
  }
  uploadJSON() {
    this.canva.onUpload()
  }

  setDraggable(id:string){
    this.canva.onChange(id);
  }

}
