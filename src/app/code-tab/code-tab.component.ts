import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import * as ace from "ace-builds";

@Component({
  selector: 'app-code-tab',
  templateUrl: './code-tab.component.html',
  styleUrls: ['./code-tab.component.css']
})
export class CodeTabComponent {
  @ViewChild("editor") private editor!: ElementRef<HTMLElement>;
  
  data: string = '';
  aceEditor: any;
  dataChanged: boolean = false;

  ngAfterViewInit(): void {
    ace.config.set("fontSize", "18px");
    //https://blog.shhdharmen.me/how-to-setup-ace-editor-in-angular
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict/');
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.session.setMode('ace/mode/json');
    
    this.aceEditor.on("change", () => {
      this.data = this.aceEditor.getValue()
      this.dataChanged = true
    });

  }

  setData(jsonData: string){
    this.aceEditor.session.setValue(jsonData);
    this.dataChanged = false
  }

  getValue(): object{
    let changed = this.dataChanged   
    this.dataChanged = false
    //Validate data
    return {'changed': changed, 'data': this.data }

  }
  
}
