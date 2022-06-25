import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {componentList} from './menu-list'
import {properties} from './menu-list'
import {CanvaComponent} from '../canva/canva.component'
import { CodeTabComponent } from '../code-tab/code-tab.component';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  @ViewChild('FileInput') FileInput!: ElementRef;
  @ViewChild('canva') canva!: CanvaComponent;
  @ViewChild('codeTab') codeTab!: CodeTabComponent;

  filename = 'formly'

  sideComponents = componentList;
  sideProperties = properties;
  collapse = true;
  
  showCanva = true
  jsonData: string = "";

  ngOnInit(): void {
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
    let result = this.canva.onUpload(file, extension)
    if (result.success){
      this.codeTab.setData(result.data)
      this.showCanva = true
    }
    this.FileInput.nativeElement.value = null
  }

  changeTab(){  
    if (this.showCanva){
      let result = this.canva.getJsonData()
      console.log(result);
      
      if (result.dataChanged){
        this.codeTab.setData(result.data)
      }
      this.showCanva = false
    }else{
      let result = this.codeTab.getJsonData();
      if (result.dataChanged){
        this.canva.setData(result.data)
      }
      this.showCanva = true
    }
  }
  setDraggable(id:string){
    this.canva.onChange(id);
  }

}
