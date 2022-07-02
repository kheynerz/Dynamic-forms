import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {componentList} from './menu-list'
import {CanvaComponent} from '../canva/canva.component'
import { CodeTabComponent } from '../code-tab/code-tab.component';
import { PropertiesComponent } from '../properties/properties.component';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit{
  //Input of type file if the user wants to upload a JSON
  @ViewChild('FileInput') FileInput!: ElementRef;
  //Canva where the user can build the Form with the components
  @ViewChild('canva') canva!: CanvaComponent;
  //Code editor where the user can see and edit the JSON of the Form
  @ViewChild('codeTab') codeTab!: CodeTabComponent;

  @ViewChild('properties') properties!: PropertiesComponent;

  filename = ''

  tabs = ['Form','Json'];
  selected = new FormControl(0);


  sideComponents = componentList;
  //sideProperties = properties;
  //Variable to toggle the view of the canva and the code editor
  toggleCanva = true
  
  //Data to show in the json code editor
  jsonData: string = "";

  ngAfterViewInit() {
    this.canva.onNormalClick()
  }

  saveJSON() {
    //If the current tab is the code editor
    //Check if the data is OK and save it
    let checkData = true
    if (!this.toggleCanva){
      let result = this.codeTab.getJsonData();
      if (result.dataChanged){
        checkData = this.canva.setData(result.data)
      }
    }
    if(checkData){
      this.canva.onSave(this.filename)
    }
  }
  
  openFile(){
    //Trigger the fileInput click event
    this.FileInput.nativeElement.click()
  }

  onChangeInputFile(){
    //Hook when the user selects a file
    let input = this.FileInput.nativeElement
    let files : Array<Blob> =   Array.from(input.files);
    //Get only the first file of the list
    let file: Blob = files[0]
    //Get the extension of the file
    let extension: string = input.files[0].name.split('.').pop().toLowerCase()
    
    //Call the canva to upload the json file
    let result = this.canva.onUpload(file, extension)
    if (result.success){
      //Set the data to the code editor
      this.codeTab.setData(result.data)
      this.toggleCanva = true
    }
    //Erase all files in the input
    this.FileInput.nativeElement.value = null
  }

  changeTab(){  
    //Change tabs (Canva and the code editor)
    if (this.toggleCanva){
      //Get the data of the canva
      let result = this.canva.getJsonData()
      //If the data has changed send the data to the code editor 
      //This is done to avoid re render the same data       
      if (result.dataChanged){
        this.codeTab.setData(result.data)
      }
      this.toggleCanva = false
      this.properties.lockPropertiesBar(true)
    }else{
      //Get the data of the code editor
      let result = this.codeTab.getJsonData();
      //If the data has changed send the data to the canva 
      //This is done to avoid re render the same data   
      if (result.dataChanged){
        this.canva.setData(result.data)
      }
      this.properties.lockPropertiesBar(false)
      this.toggleCanva = true
    }
  }
  setDraggable(id:string,insertMode:string){
    this.canva.onInsert(id, insertMode);
  }

  deleteComponent(){
    this.canva.onDelete();
  }

  moveComponent(insertMode:string){
    this.canva.onMove(insertMode);
  }

  moveFieldGroup(up:boolean){
    this.canva.onMoveFieldGroup(up);
  }

  showProperties(component: any){
    this.properties.showProperties(component)
    
  }

  updateChanges(changes: any){
    if (changes.success){
      this.canva.update(changes)
      let result = this.canva.getJsonData()
      if (result.dataChanged){
        this.codeTab.setData(result.data)
      }
    }
  }

}
