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
    this.canva.onSave(this.filename)
  }
  
  
  openFile(){
    this.FileInput.nativeElement.click()
  }

  onChangeInputFile(){
    let input = this.FileInput.nativeElement
    let files : Array<Blob> =   Array.from(input.files);
    let file: Blob = files[0]
    let extension: string = input.files[0].name.split('.').pop().toLowerCase()
    this.canva.onUpload(file, extension)
    this.FileInput.nativeElement.value = null
  }

  setDraggable(id:string){
    this.canva.onChange(id);
  }

}
