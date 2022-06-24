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
  changed: boolean = false;

  ngAfterViewInit(): void {
    ace.config.set("fontSize", "18px");
    //https://blog.shhdharmen.me/how-to-setup-ace-editor-in-angular
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict/');
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.session.setMode('ace/mode/json');
    
    this.aceEditor.on("change", () => {
      this.data = this.aceEditor.getValue()
      this.changed = true
    });

  }

  setData(jsonData: string){
    this.aceEditor.session.setValue(jsonData);
    this.changed = false
  }

  getJsonData(){
    let dataChanged = this.changed
    this.changed = false
    return {dataChanged, "data": this.data}
  }
  
}
