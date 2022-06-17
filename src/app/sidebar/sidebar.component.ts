import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {componentList} from './menu-list'
import {properties} from './menu-list'
import {CanvaComponent} from '../canva/canva.component'

import FileSaver from 'file-saver';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  @ViewChild('canva') canva!: CanvaComponent;
  @ViewChild('FileInput') FileInput!: ElementRef;


  sideComponents = componentList;
  sideProperties = properties;
  collapse = true;
  
  filename = 'formly'

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
    let data = this.canva.onSave()
    console.log(data);
    var blob = new Blob([data], {type: "text/json;charset=utf-8"});
    FileSaver.saveAs(blob, this.filename+'.json');
    
  }
  openFile(){
    this.FileInput.nativeElement.click()
  }

  onChangeInputFile(){
    let input = this.FileInput.nativeElement
    let files : Array<Blob> =   Array.from(input.files);
    let file: Blob = files[0]
    this.canva.onUpload(file)
    this.FileInput.nativeElement.value = null
  }

  setDraggable(id:string){
    this.canva.onChange(id);
  }

}
