import { Component,  ViewChild, ElementRef } from '@angular/core';

import * as ace from "ace-builds";

@Component({
  selector: 'app-code-tab',
  templateUrl: './code-tab.component.html',
  styleUrls: ['./code-tab.component.css']
})
export class CodeTabComponent {
  @ViewChild("editor") private editor!: ElementRef<HTMLElement>; //Reference to the Editor Element
  
  data: string = ''; //Data to render in the editor
  aceEditor: any; 

  //This variable is used to know if the user has changed the JSON in the code editor
  changed: boolean = false; 

  ngAfterViewInit(): void {
    /*Configuration of the Ace editor*/
    ace.config.set("fontSize", "18px");
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict/');
    this.aceEditor = ace.edit(this.editor.nativeElement);
    
    //Set the mode to syntax highlight with the JSON format
    this.aceEditor.session.setMode('ace/mode/json');
    
    /*When the user change the textarea in the editor, save the changes in the data variable*/
    this.aceEditor.on("change", () => {
      this.data = this.aceEditor.getValue()
      this.changed = true
    });

  }

  setData(jsonData: string){
    /*Set the data from the form Canva*/
    this.data = jsonData
    this.aceEditor.session.setValue(jsonData);
    this.changed = false
  }

  getJsonData(){
    /*Return the JSON Data to the canva*/
    let dataChanged = this.changed
    this.changed = false
    return {dataChanged, "data": this.data}
  }
  
}
