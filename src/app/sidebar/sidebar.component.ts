import { Component, OnInit } from '@angular/core';
import {componentList} from './menu-list'
import {properties} from './menu-list'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  sideComponents = componentList;
  sideProperties = properties;
  collapse = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.collapse = !this.collapse;
  }

}
